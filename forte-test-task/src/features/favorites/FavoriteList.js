import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Error:', e);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favorites', serializedState);
  } catch (e) {
    console.warn('Error:', e);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFromLocalStorage(),
  reducers: {
    addFavorite: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        saveToLocalStorage(state);
      }
    },
    removeFavorite: (state, action) => {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    
      saveToLocalStorage(state);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;