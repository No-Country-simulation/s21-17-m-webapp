import api from "../../../app/config/api";

// Obtener lista de artesanos (GET)
export const getArtisans = async () => {
  try {
    const response = await api.get("/landing/artisans");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los artesanos:", error);
    throw error;
  }
};
