import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: '1b4fdb5da9795ebf24b2c8b8e0a53d46', // Замените на ваш API-ключ
  },
});

export default api;