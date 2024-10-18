import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from './weatherSlice';

//components
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import WeatherForm from './WeatherForm';
import WeatherDetails from './WeatherDetails';
import FiveDayForecast from './FiveDayForecast';
import FavoriteList from '../favorites/FavoriteList';

//styles
import '../../styles/features/weather/weather.scss'

//hooks
import useFavorites from '../../hooks/useFavorite';


function Weather() {
  const dispatch = useDispatch();

  const { data, loading, error, forecast } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather('London'));
    dispatch(fetchForecast('London'));
  }, [dispatch]);

  const hasFavorites = useFavorites();

  return (
    <div className='content-wrapper'>
      <div className='weather-wrapper'>
        <h2 className='weather-title'>Weather App</h2>
        <WeatherForm />
        <div className='weather'>
          {loading && <Loading/>}
          {error && <ErrorMessage message={error} />}
          {data && <WeatherDetails data={data} />}
          {forecast && !error && !loading && (
            <div className='forecast-wrapper'>
              <FiveDayForecast forecast={forecast} />
            </div>
          )}
        </div>
      </div>

      {hasFavorites && (
        <div className='favorite-list-wrapper'>
          <FavoriteList/>
        </div>
      )}
    </div>
  );
}

export default Weather;