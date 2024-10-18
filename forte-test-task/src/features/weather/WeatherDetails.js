import React from 'react';

//utils
import { convertKelvinToCelsius } from '../../utils/convertTemperature';

//styles
import '../../styles/features/weather/weather-details.scss'

//components
import FavoriteToggle from '../favorites/FavoriteToggle';

function WeatherDetails({ data }) {
  return (
    <div className='weather-details-wrapper'>
      <div className='weather-details'>
        <h3>Current weather in {data.name} is:</h3>
        <p>Temperature: {convertKelvinToCelsius(data.main.temp)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind speed: {data.wind.speed} m/s</p>
      </div>
      <FavoriteToggle city={data.name} />
    </div>
  );
}

export default WeatherDetails;