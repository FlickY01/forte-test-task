import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from './weatherSlice';

//styles
import '../../styles/features/weather/weather-form.scss'

function WeatherForm() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchWeather(city));
  };

  return (
    <form onSubmit={handleSubmit} className='choose-city-form'>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Write your city"
        className='choose-city-input'
      />
      <button type="submit" className='submit-button'><p>Submit</p></button>
    </form>
  );
}

export default WeatherForm;