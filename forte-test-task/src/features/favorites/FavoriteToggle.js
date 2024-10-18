import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from './favoritesSlice';

//styles
import '../../styles/features/favorite/favorite-toggle.scss'

const FavoriteToggle = ({ city }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.includes(city);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };

  return (
    <button onClick={handleToggleFavorite} className='favorite-button'>
      {isFavorite ? <p className='delete-from-favorite'>Delete from favorite</p> : <p className='add-to-favorite'>Add to favorite</p>}
    </button>
  );
};

export default FavoriteToggle;