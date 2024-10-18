import favoritesReducer, { addFavorite, removeFavorite } from './favoritesSlice';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('favoritesSlice', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should handle initial state', () => {
    const initialState = [];
    expect(favoritesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addFavorite', () => {
    const previousState = [];
    const newState = favoritesReducer(previousState, addFavorite('London'));
    expect(newState).toEqual(['London']);
    expect(window.localStorage.getItem('favorites')).toEqual(JSON.stringify(['London']));
  });

  it('should not add duplicate favorites', () => {
    const previousState = ['London'];
    const newState = favoritesReducer(previousState, addFavorite('London'));
    expect(newState).toEqual(['London']);
    expect(window.localStorage.getItem('favorites')).toEqual(JSON.stringify(['London']));
  });

  it('should handle removeFavorite', () => {
    const previousState = ['London', 'Paris'];
    const newState = favoritesReducer(previousState, removeFavorite('London'));
    expect(newState).toEqual(['Paris']);
    expect(window.localStorage.getItem('favorites')).toEqual(JSON.stringify(['Paris']));
  });

  it('should not remove a city that is not in favorites', () => {
    const previousState = ['London'];
    const newState = favoritesReducer(previousState, removeFavorite('Paris'));
    expect(newState).toEqual(['London']);
    expect(window.localStorage.getItem('favorites')).toEqual(JSON.stringify(['London']));
  });
});
