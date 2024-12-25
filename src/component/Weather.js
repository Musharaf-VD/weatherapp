import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../asset/Assets/search.png'
import clear_icon from '../asset/Assets/clear.png'
import cloud_icon from '../asset/Assets/cloud.png'
import drizzle_icon from '../asset/Assets/drizzle.png'
import humidity_icon from '../asset/Assets/humidity.png'
import rain_icon from '../asset/Assets/rain.png'
import snow_icon from '../asset/Assets/snow.png'
import wind_icon from '../asset/Assets/wind.png'


const Weather = () => {
    const [search,setSearch] = useState("")
    const [city,setCity] =useState(null)
    const handleGetWeather = async () => {
      if (!search.trim()) {
        console.error("Search input is empty.");
        return;
      }
  
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=72d646d09dffab64c349661eeccaea1a&units=matric`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setCity(result);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
      }
      setSearch(" ")
    };
   
 
    
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <img src={search_icon}onClick={handleGetWeather}/>
        </div>

        <img src={clear_icon} className='weather-icon'/>
        <p className='temperature'>{city?.main.temp}° C</p> 
        <p className='location'>{city?.name}</p>

        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt=''/>
          
          <div>
            <p>{city?.main?.humidity}%</p>
            <span>humidity</span>
            </div>
          </div>

          <div className='col'>
            <img src={wind_icon} alt=''/>
          
          <div>
            <p>{city?.wind.speed}km/h</p>
            <span>wind speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather