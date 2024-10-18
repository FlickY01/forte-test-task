import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData, fetchForecastData } from '../../services/weatherService';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await fetchWeatherData(city);
    return response.data;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city) => {
    const response = await fetchForecastData(city);
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    forecast: null,
    loading: false,
    error: null,
    cityWeather: {},
  },
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.forecast = null; 
    },
    setWeather: (state, action) => {
      const city = action.payload.name;
      state.cityWeather[city] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.cityWeather[action.payload.name] = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = null;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearWeather, setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;