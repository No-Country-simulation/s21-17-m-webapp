import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

const ArtisanContext = createContext();

export const ArtisanProvider = ({ children }) => {
  const [artisan, setArtisan] = useState(null);

  // Función para actualizar el artesano
  const updateArtisan = (updatedFields) => {
    setArtisan((prevArtisan) => ({
      ...prevArtisan,
      ...updatedFields,
    }));
  };

  const createArtisan = (artisanData) => {
    setArtisan(artisanData);
  };

  const resetArtisan = () => {
    setArtisan(null);
  };

  return (
    <ArtisanContext.Provider
      value={{ artisan, createArtisan, updateArtisan, resetArtisan }}
    >
      {children}
    </ArtisanContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArtisanContext = () => useContext(ArtisanContext);

ArtisanProvider.propTypes = {
  children: PropTypes.node,
};
