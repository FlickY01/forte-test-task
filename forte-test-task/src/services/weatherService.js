import api from './api';

export const fetchWeatherData = (city) => {
  return api.get('weather', {
    params: {
      q: city,
    },
  });
};

export const fetchForecastData = (city) => {
  return api.get('forecast', {
    params: {
      q: city,
    },
  });
};