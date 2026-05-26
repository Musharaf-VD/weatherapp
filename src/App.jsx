import React, { useState } from 'react';
import Weather from './component/Weather';

const App = () => {
  const [weatherCondition, setWeatherCondition] = useState('Clear');

  const getTheme = (condition) => {
    switch (condition) {
      case 'Clear':
        return {
          bg: 'bg-gradient-to-br from-yellow-300 to-orange-500',
          card: 'bg-orange-100/80',
          text: 'text-amber-900',
        };
      case 'Clouds':
        return {
          bg: 'bg-gradient-to-br from-gray-300 to-slate-500',
          card: 'bg-gray-100/80',
          text: 'text-gray-800',
        };
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return {
          bg: 'bg-gradient-to-br from-blue-800 to-slate-900',
          card: 'bg-blue-900/60',
          text: 'text-blue-50',
        };
      case 'Snow':
        return {
          bg: 'bg-gradient-to-br from-blue-100 to-white',
          card: 'bg-white/80',
          text: 'text-slate-800',
        };
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return {
          bg: 'bg-gradient-to-br from-gray-200 to-gray-400',
          card: 'bg-white/60',
          text: 'text-gray-800',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-400 to-indigo-600',
          card: 'bg-white/80',
          text: 'text-slate-800',
        };
    }
  };

  const theme = getTheme(weatherCondition);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${theme.bg}`}>
      <Weather theme={theme} onWeatherChange={setWeatherCondition} />
    </div>
  );
};

export default App;
