import React, { useEffect, useState } from 'react'
import search_icon from '../asset/images/search.png'
import clear_icon from '../asset/images/clear.png'
import cloud_icon from '../asset/images/cloud.png'
import drizzle_icon from '../asset/images/drizzle.png'
import humidity_icon from '../asset/images/humidity.png'
import rain_icon from '../asset/images/rain.png'
import snow_icon from '../asset/images/snow.png'
import wind_icon from '../asset/images/wind.png'
import app_icon from '../asset/images/favicon.png'

const Weather = ({ theme, onWeatherChange }) => {
    const [search, setSearch] = useState("")
    const [city, setCity] = useState(null)
    const [toast, setToast] = useState(null)

    const allIcons = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": cloud_icon,
      "03n": cloud_icon,
      "04d": cloud_icon,
      "04n": cloud_icon,
      "09d": drizzle_icon,
      "09n": drizzle_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    }

    const searchCity = async (cityName) => {
      if (!cityName || !cityName.trim()) {
        return false;
      }
      
      setToast(null);
  
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName.trim()}&appid=${apiKey}&units=metric`
        );
        
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "City not found");
        }
        
        setCity(result);
        if (result.weather && result.weather.length > 0) {
          onWeatherChange(result.weather[0].main);
        }
        return true;
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
        setCity(null);
        onWeatherChange("Clear");
        setToast({ message: error.message === "city not found" ? "City not found! Please check the city name." : "Failed to fetch weather data.", type: "error" });
        setTimeout(() => setToast(null), 3000);
        return false;
      }
    };

    useEffect(() => {
      setToast({ message: "Welcome! Enter your city to get started ✨", type: "success" });
      setTimeout(() => setToast(null), 4000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetWeather = async () => {
      const success = await searchCity(search);
      if (success) {
        setSearch("");
      }
    };

    const weatherIcon = city?.weather?.[0]?.icon ? (allIcons[city.weather[0].icon] || clear_icon) : clear_icon;
     
  return (
    <>
      {toast && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg font-medium z-50 animate-slide-up backdrop-blur-sm whitespace-nowrap text-sm sm:text-base ${toast.type === 'error' ? 'bg-red-500/90' : 'bg-emerald-500/90'}`}>
          {toast.message}
        </div>
      )}
      <div className={`flex flex-col items-center rounded-2xl p-6 sm:p-10 max-w-sm w-full shadow-2xl backdrop-blur-md transition-colors duration-500 ${theme.card} ${theme.text}`}>

        {/* App Header */}
        <div className="flex items-center gap-2 mb-5 self-start">
          <img src={app_icon} alt="Weather App" className="w-8 h-8 rounded-full object-cover shadow-md ring-2 ring-white/40" />
          <span className="text-sm font-semibold opacity-70 tracking-widest uppercase">Weather App</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full">
            <div className="relative flex-1 min-w-0">
              <input 
                type="text" 
                placeholder="search" 
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGetWeather()}
                className="w-full h-12 border-none outline-none rounded-full pl-4 pr-10 sm:pl-6 sm:pr-12 text-gray-600 bg-white/90 text-base sm:text-lg shadow-inner focus:ring-2 focus:ring-opacity-50 focus:ring-current transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 text-lg font-bold"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button 
              onClick={handleGetWeather}
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-colors flex-shrink-0"
            >
              <img src={search_icon} alt="search button" className="w-5" />
            </button>
        </div>

        <img src={weatherIcon} className="h-32 sm:h-36 my-6 sm:my-8 drop-shadow-lg" alt="weather condition"/>
        <p className="text-6xl sm:text-7xl font-bold leading-none mb-2">{city ? Math.round(city.main.temp) : '--'}°c</p> 
        <p className="text-3xl sm:text-4xl font-medium mb-8 sm:mb-10 tracking-wide">{city?.name || '---'}</p>

        <div className="w-full flex justify-between px-1 sm:px-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={humidity_icon} alt="humidity icon" className="h-6 sm:h-7 opacity-80"/>
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold leading-tight">{city?.main?.humidity || '--'}%</p>
              <span className="text-xs sm:text-sm opacity-80">Humidity</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <img src={wind_icon} alt="wind speed icon" className="h-6 sm:h-7 opacity-80"/>
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold leading-tight">{city ? Math.round(city.wind.speed) : '--'} km/h</p>
              <span className="text-xs sm:text-sm opacity-80">Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Weather
