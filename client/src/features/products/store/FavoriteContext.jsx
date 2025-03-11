import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Estado inicial con favoritos obtenidos del localStorage
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Sincroniza favoritos con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Agregar un producto a favoritos
  const addFavorite = (newFavorite) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, { ...newFavorite }];
      return updatedFavorites;
    });
  };

  // Eliminar un producto de favoritos
  const deleteFavorite = (favoriteId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  };

  // Verificar si un producto está en favoritos
  const isFavorite = (favoriteId) => {
    return favorites.some((favorite) => favorite.id === favoriteId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, deleteFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useFavoritesContext = () => useContext(FavoritesContext);

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
