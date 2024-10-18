import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useFavorites = () => {
  const [hasFavorites, setHasFavorites] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites && JSON.parse(storedFavorites).length > 0) {
      setHasFavorites(true);
    } else {
      setHasFavorites(false);
    }
  }, [favorites]);

  return hasFavorites;
};

export default useFavorites;
