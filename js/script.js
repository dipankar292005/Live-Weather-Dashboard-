// Weather API Configuration - Using Open-Meteo (Free, No Key Required)
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const weatherSection = document.getElementById('weatherSection');
const emptyState = document.getElementById('emptyState');
const forecastContainer = document.getElementById('forecastContainer');

// Pulse animation for search button
function pulseSearch() {
  searchBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    searchBtn.style.transform = 'scale(1)';
  }, 200);
}

// Event Listeners
searchBtn.addEventListener('click', () => searchWeather());
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchWeather();
});

// Wind Direction Function
function getWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
}

// Format Time
function formatTime(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Format Date
function formatDate(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Get Weather Icon - Map WMO codes to icon
function getWeatherIcon(code, isDay) {
  const iconMap = {
    0: '01', 1: '02', 2: '03', 3: '04', 45: '50', 48: '50',
    51: '09', 53: '09', 55: '09', 61: '10', 63: '10', 65: '10',
    71: '13', 73: '13', 75: '13', 77: '13', 80: '10', 82: '10',
    85: '13', 86: '13', 95: '11', 96: '11', 99: '11'
  };
  
  const iconCode = iconMap[code] || '04';
  const dayPart = isDay ? 'd' : 'n';
  return `https://openweathermap.org/img/wn/${iconCode}${dayPart}@4x.png`;
}

// Get weather description
function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Foggy', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Slight rain showers', 82: 'Moderate rain showers', 85: 'Slight snow showers',
    86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm with hail',
    99: 'Thunderstorm with large hail'
  };
  return descriptions[code] || 'Unknown';
}

// Search Weather
async function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showError('Please enter a city name');
    return;
  }

  pulseSearch();
  showLoading(true);
  hideError();

  try {
    // Step 1: Geocode city name to coordinates
    const geocodeUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);
    
    if (!geocodeResponse.ok) {
      showError('❌ Failed to find city. Please try again.');
      showLoading(false);
      return;
    }

    const geocodeData = await geocodeResponse.json();
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      showError('❌ City not found. Please check the spelling and try again.');
      showLoading(false);
      return;
    }

    const location = geocodeData.results[0];
    const { latitude, longitude, name, country, timezone } = location;

    // Step 2: Fetch weather for coordinates
    const weatherUrlWithParams = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,pressure_msl,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${timezone}`;
    
    const weatherResponse = await fetch(weatherUrlWithParams);
    
    if (!weatherResponse.ok) {
      showError('❌ Failed to fetch weather data. Please try again.');
      showLoading(false);
      return;
    }

    const weatherData = await weatherResponse.json();

    // Display weather
    displayCurrentWeather(weatherData, location);
    displayForecast(weatherData, timezone);

    // Show weather section, hide empty state
    weatherSection.classList.remove('hidden');
    emptyState.classList.add('hidden');

    showLoading(false);
  } catch (error) {
    console.error('Error:', error);
    showError('❌ Network error: ' + error.message);
    showLoading(false);
  }
}

// Display Current Weather
function displayCurrentWeather(data, location) {
  const { current, timezone } = data;
  const { name, country, latitude, longitude } = location;

  // Basic Info
  document.getElementById('cityName').textContent = `${name}, ${country}`;
  document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
  document.getElementById('temp').textContent = Math.round(current.temperature_2m);
  document.getElementById('description').textContent = getWeatherDescription(current.weather_code);
  document.getElementById('feelsLike').textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;
  document.getElementById('weatherIcon').src = getWeatherIcon(current.weather_code, true);

  // Quick Stats
  document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
  document.getElementById('windSpeed').textContent = `${current.wind_speed_10m.toFixed(1)} m/s`;
  document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
  document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;

  // Cloud Cover
  const cloudPercent = current.cloud_cover;
  document.getElementById('cloudPercent').textContent = `${cloudPercent}%`;
  document.querySelector('.progress-fill').style.width = `${cloudPercent}%`;

  // Wind Details
  document.getElementById('windDir').textContent = `${getWindDirection(current.wind_direction_10m)} (${current.wind_direction_10m}°)`;
  document.getElementById('windGust').textContent = `${current.wind_speed_10m.toFixed(1)} m/s`;

  // Sunrise & Sunset - use hardcoded values for now
  document.getElementById('sunrise').textContent = '06:30 AM';
  document.getElementById('sunset').textContent = '04:45 PM';

  // Location Info
  document.getElementById('latitude').textContent = latitude.toFixed(4);
  document.getElementById('longitude').textContent = longitude.toFixed(4);
  
  const tzOffset = timezone.split('/')[0];
  document.getElementById('timezone').textContent = `${timezone}`;
}

// Display 5-Day Forecast
function displayForecast(data, timezone) {
  if (!data || !data.daily) {
    forecastContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">Forecast unavailable</p>';
    return;
  }

  const { daily } = data;
  forecastContainer.innerHTML = '';

  // Show next 5 days (skip today - index 0)
  for (let i = 1; i <= 5 && i < daily.time.length; i++) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.style.animationDelay = ((i - 1) * 0.08) + 's';

    const date = new Date(daily.time[i]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const temp_max = Math.round(daily.temperature_2m_max[i]);
    const temp_min = Math.round(daily.temperature_2m_min[i]);
    const weatherCode = daily.weather_code[i];

    card.innerHTML = `
      <div class="forecast-date">${dayName}<br>${dateStr}</div>
      <img src="${getWeatherIcon(weatherCode, true)}" alt="Weather" class="forecast-icon">
      <div class="forecast-desc">${getWeatherDescription(weatherCode)}</div>
      <div class="forecast-temp">
        <div class="forecast-temp-item">
          <span class="forecast-temp-label">High</span>
          <span class="forecast-temp-value">${temp_max}°</span>
        </div>
        <div class="forecast-temp-item">
          <span class="forecast-temp-label">Low</span>
          <span class="forecast-temp-value">${temp_min}°</span>
        </div>
      </div>
    `;

    forecastContainer.appendChild(card);
  }
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
  setTimeout(() => { errorDiv.classList.add('fadeout'); }, 4000);
}

function hideError() {
  errorDiv.textContent = '';
  errorDiv.classList.remove('show', 'fadeout');
}

function showLoading(show) {
  loadingDiv.classList.toggle('hidden', !show);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    cityInput.value = 'London';
    searchWeather();
  }, 300);
});
