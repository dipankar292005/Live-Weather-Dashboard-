# Weather Dashboard 🌤️

A fully animated weather dashboard that displays real-time weather data for any city worldwide. Built with HTML, CSS, and vanilla JavaScript using the OpenWeatherMap API.

## Features

✨ **Real-time Weather Data**
- Current temperature, humidity, wind speed, pressure, visibility
- Detailed weather description with animated icons
- "Feels like" temperature

🌅 **Extended Information**
- Sunrise & sunset times
- Cloud cover percentage with visual progress bar
- Wind direction and gust speed
- Location coordinates and timezone
- 5-day weather forecast

🎨 **Animated UI**
- Smooth fade-in and slide-up animations
- Floating weather icons
- Pulsing stat icons
- Card hover effects with transform animations
- Loading spinner
- Responsive gradient background
- Glass-morphism effects

📱 **Fully Responsive**
- Mobile, tablet, and desktop layouts
- Touch-friendly search interface
- Optimized grid layouts

🔍 **Easy Search**
- Search by city name
- Enter key support
- Error handling for invalid cities
- Real-time API integration

## How to Use

1. **Open in Browser**
   - Double-click `index.html` to open directly, or
   - Serve locally using Python:

   ```powershell
   cd "C:\Users\dp600\OneDrive\Desktop\Projects\pp02\weather-app"
   python -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```

2. **Search for Weather**
   - Type a city name in the search box
   - Press Enter or click the Search button
   - Wait for the dashboard to load weather data

3. **View Weather Details**
   - See current temperature and conditions
   - Check humidity, wind, pressure, visibility
   - View sunrise/sunset times
   - See cloud cover percentage
   - Check 5-day forecast

## API

Uses **OpenWeatherMap Free API** for weather data:
- Endpoint: `https://api.openweathermap.org/data/2.5`
- Current weather: `/weather?q={city}&units=metric`
- 5-day forecast: `/forecast?lat={lat}&lon={lon}`

**Free tier includes:**
- 5-day forecast
- All weather parameters
- Up to 60 calls/minute

## File Structure

```
weather-app/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   └── script.js       # API integration and interactivity
└── README.md           # This file
```

## Customization

### Change Default City
Edit `js/script.js` line ~105:
```javascript
cityInput.value = 'New York'; // Change to your preferred city
```

### Customize Colors
Edit `:root` variables in `css/styles.css`:
```css
--accent: #00d4ff;           /* Primary accent color */
--accent-warm: #ff6b9d;      /* Warm accent */
--accent-cool: #4ecdc4;      /* Cool accent */
```

### Temperature Units
Currently using Celsius. To use Fahrenheit, change in `js/script.js`:
- Replace `&units=metric` with `&units=imperial`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes

- Weather data updates in real-time from OpenWeatherMap
- Free API key included (limited to 60 calls/min)
- No backend required - works entirely client-side
- CORS-enabled API allows direct browser requests

## Future Enhancements

- Add hourly forecast
- UV index and air quality data
- Weather alerts
- Multiple city comparison
- Weather history charts
- Dark/light theme toggle
- Local storage for recent searches
- PWA capabilities

Enjoy! 🌍
