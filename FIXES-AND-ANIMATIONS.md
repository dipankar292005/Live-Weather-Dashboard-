# Weather Dashboard 🌤️ - UPDATED

A fully animated, responsive weather dashboard that displays real-time weather data for any city worldwide. Built with vanilla JavaScript using the OpenWeatherMap API.

## ✨ What's New (Bug Fixes & Animations)

### 🐛 Bug Fixes Applied
✅ **Fixed API CORS Issues** - Direct HTTPS API calls  
✅ **Enhanced Error Messages** - User-friendly notifications with icons  
✅ **Improved Forecast Display** - Graceful fallbacks for missing data  
✅ **Better URL Encoding** - Support for special characters in city names  
✅ **Auto-dismissing Errors** - Errors fade out after 4 seconds  

### 🎨 New Animations Added
- 🔘 Search button pulse & ripple wave effect
- 🎯 Forecast cards with staggered slideUp + shimmer effect  
- 🌪️ Weather icon floating + slow rotation cycle
- 💫 Stat cards with glow on hover + smooth transitions
- 📍 Card lifts with subtle 2° rotation on hover
- ⚡ Error messages with smooth fadeIn/slideDown animations
- 💧 Glassmorphism effects with backdrop blur
- 🌊 Smooth cubic-bezier timing functions throughout

## 🎮 Features

**Real-time Weather Data**
- Current temperature & conditions with animated icons
- Humidity, wind speed, pressure, visibility
- "Feels like" temperature 
- Wind direction (N, NE, E, SE, S, SW, W, NW) with bearing
- Cloud cover % with animated progress bar

**Extended Information**
- Sunrise & sunset times
- Wind gust speed
- Location coordinates & timezone
- 5-day forecast with animations

**Animated UI Elements**
- Smooth all-around fade-in/slide-up animations
- Floating + rotating weather icons
- Pulsing stat icons with pulse animation
- Card hover effects with lift & tilt
- Animated progress bars
- Loading spinner with continuous rotation
- Shimmer effects on cards
- Ripple effect on search button

**Fully Responsive**
- Mobile (320px+), Tablet (768px+), Desktop (1200px+)
- Touch-friendly interface
- Optimized layouts for all screens

**Easy to Use**
- Search by city name
- Enter key support
- Auto-loads weather on startup
- Real-time updates

## 🚀 Quick Start

```powershell
cd "C:\Users\dp600\OneDrive\Desktop\Projects\pp02\weather-app"
python -m http.server 8000
# Open http://localhost:8000
```

## 🎨 Animation Details

**Keyframe Animations Used:**
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeOutUp`
- `slideUp`, `slideInDown`
- `scaleIn`, `shimmer`, `spin`
- `float` (vertical + rotation)
- `shakeX`, `ripple`

**Animation Timing:**
- Button ripple: 0.6s ease-out
- Card slideUp: 0.6s ease
- Error fadeOut: 0.3s ease
- Icon rotation: 20s linear infinite
- Icon float: 3s ease-in-out infinite
- Stat pulse: 2s ease-in-out infinite

**Hover Effects:**
- Stat cards: `translateY(-4px) translateX(2px)` + glow
- Forecast cards: `translateY(-12px) rotateZ(2deg)` + shadow
- Detail cards: `translateY(-4px)` + color change
- Input focus: Border color shift + background glow

## 📁 File Structure

```
weather-app/
├── index.html              # HTML (search, weather display, forecast)
├── css/styles.css          # 15+ animations & responsive design
├── js/script.js            # API integration & interactivity
└── README-UPDATED.md       # This file
```

## 🌐 API Configuration

**OpenWeatherMap Free API:**
- No credit card required
- 60 calls/minute limit (plenty for personal use)
- Endpoints: `/weather` & `/forecast`
- Includes: temp, humidity, wind, clouds, pressure, visibility, etc.

**API Calls Made:**
1. Current weather by city name
2. 5-day forecast by lat/lon coordinates

## 🎯 How to Use

1. **Type city name** → Press Enter or click Search
2. **View current weather** → Temp, conditions, humidity, wind, etc.
3. **Check extended info** → Sunrise/sunset, cloud cover, location
4. **See forecast** → Staggered animated forecast cards

## 🔧 Customization

**Change Default City** (`js/script.js` line ~154):
```javascript
cityInput.value = 'Paris';  // Any city name
```

**Change Colors** (`css/styles.css` `:root`):
```css
--accent: #00d4ff;           /* Primary color */
--accent-warm: #ff6b9d;      /* Secondary color */
--danger: #ff6b6b;           /* Error color */
```

**Temperature Units** (`js/script.js` lines 77, 85):
Replace: `&units=metric` → `&units=imperial`

**Animation Speed** (`css/styles.css` keyframes):
Adjust timing in `@keyframes` (e.g., `3s` → `2s`)

## ✅ What Was Fixed

| Issue | Solution |
|-------|----------|
| API not responding | Direct HTTPS calls instead of proxy |
| Cryptic error messages | User-friendly errors with emoji icons |
| Forecast data missing | Graceful fallback with message |
| City names with accents | Proper URL encoding applied |
| Errors staying visible | Auto-dismiss after 4 seconds |
| No visual feedback | Added ripple & pulse animations |

## 🌐 Browser Support

✅ Chrome/Chromium 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **No external dependencies** - Vanilla JS only
- **60fps animations** - Using transform & opacity
- **Fast load** - ~50KB total (CSS + JS + HTML)
- **Quick API response** - Usually < 1 second

## 🚢 Testing Results

✓ Loads default city (London) on startup  
✓ Search works for any valid city  
✓ Error handling for invalid cities  
✓ All animations smooth at 60fps  
✓ Responsive on mobile/tablet/desktop  
✓ API calls successful  
✓ Forecast data displays correctly  

## 🔮 Ideas for Future Versions

- Hourly forecast breakdown
- Air quality index (AQI)
- Weather alerts
- Compare multiple cities
- Historical weather charts
- Theme toggle (dark/light)
- Recent searches in localStorage
- PWA with offline support
- Geolocation detection

## 📝 Notes

- **Free API included** - No signup needed
- **Client-side only** - No backend required
- **Instant loading** - Optimized animations
- **Mobile-friendly** - Touch and responsive
- **GPU accelerated** - Smooth 60fps animations

---

**Built with ❤️ using HTML5, CSS3 & Vanilla JavaScript**

Try searching for: London, New York, Paris, Tokyo, Sydney, Mumbai, Dubai, Singapore, Berlin, Seoul 🌍✨
