import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../weather/weatherSlice';
import FavoriteToggle from './FavoriteToggle';

//utils
import { convertKelvinToCelsius } from '../../utils/convertTemperature';

//styles
import '../../styles/features/favorite/favorite-list.scss'

const FavoriteList = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const cityWeather = useSelector((state) => state.weather.cityWeather);

    useEffect(() => {
        if (favorites.length) {
            favorites.forEach(city => {
                if (!cityWeather[city]) {
                    dispatch(fetchWeather(city));
                }
            });
        }
    }, [favorites, dispatch, cityWeather]);

    return (
        <div className='favorite-cities-wrapper'>
            <h3>Favorite cities:</h3>
            <div className='favorite-city-wrapper'>
              {favorites.map((city) => (
                  <div key={city} className='favorite-city'>
                      <h3>{city}</h3>
                      <div className='favorite-city-content'>
                        <div className='favorite-city-weather'>
                          {cityWeather[city] && (
                              <>
                                <p>Temperature: {convertKelvinToCelsius(cityWeather[city].main.temp)}°C</p>
                                <p>Humidity: {cityWeather[city].main.humidity}%</p>
                                <p>Wind speed: {cityWeather[city].wind.speed} m/s</p>
                              </>
                            )}
                        </div>
                        <FavoriteToggle city={city} />
                      </div>
                  </div>
              ))}

            </div>
        </div>
    );
};

export default FavoriteList;
