import weatherReducer, { clearWeather, setWeather, fetchWeather, fetchForecast } from './weatherSlice';

describe('weatherSlice', () => {
  const initialState = {
    data: null,
    forecast: null,
    loading: false,
    error: null,
    cityWeather: {},
  };

  it('should handle initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle clearWeather', () => {
    const previousState = {
      data: { name: 'London' },
      forecast: { list: [] },
      loading: false,
      error: null,
      cityWeather: { London: { name: 'London' } },
    };
    expect(weatherReducer(previousState, clearWeather())).toEqual(initialState);
  });

  it('should handle setWeather', () => {
    const previousState = { ...initialState };
    const payload = { name: 'Paris', main: { temp: 298.15 }, wind: { speed: 5 } };
    expect(weatherReducer(previousState, setWeather(payload))).toEqual({
      ...previousState,
      cityWeather: { Paris: payload },
    });
  });

  // async tests 
  it('should handle fetchWeather.pending', () => {
    const action = { type: fetchWeather.pending.type };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle fetchWeather.fulfilled', () => {
    const payload = { name: 'Berlin', main: { temp: 295 }, wind: { speed: 4 } };
    const action = { type: fetchWeather.fulfilled.type, payload };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: payload,
      cityWeather: { Berlin: payload },
      loading: false,
    });
  });

  it('should handle fetchWeather.rejected', () => {
    const action = { type: fetchWeather.rejected.type, error: { message: 'City not found' } };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'City not found',
      data: null,
    });
  });

  it('should handle fetchForecast.pending', () => {
    const action = { type: fetchForecast.pending.type };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle fetchForecast.fulfilled', () => {
    const payload = { list: [{ temp: 295 }, { temp: 300 }] };
    const action = { type: fetchForecast.fulfilled.type, payload };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      forecast: payload,
      loading: false,
    });
  });

  it('should handle fetchForecast.rejected', () => {
    const action = { type: fetchForecast.rejected.type, error: { message: 'Network Error' } };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Network Error',
    });
  });
});