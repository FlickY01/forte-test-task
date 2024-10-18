import React from 'react';

//utils
import { processForecast } from '../../utils/processForecast';
import { convertKelvinToCelsius } from '../../utils/convertTemperature';

//styles
import '../../styles/features/weather/five-day-forecast.scss'

const FiveDayForecast = ({ forecast }) => {
  const dailyForecast = processForecast(forecast);

  return (
    <div className='five-day-forecast-wrapper'>
      <h3>5-Day Forecast for {forecast.city.name}:</h3>
      <div className='day-forecast-wrapper'>
        {dailyForecast.map((item, index) => {
            const date = new Date(item.dt * 1000);
            return (
            <div key={index} className='day-forecast'>
                <p className='forecast-date'>{date.toLocaleDateString()}</p>
                <p>Temperature: {convertKelvinToCelsius(item.main.temp)}°C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Wind speed: {item.wind.speed} m/s</p>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;