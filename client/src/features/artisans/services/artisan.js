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

export const getArtisanById = async (id) => {
  try {
    const response = await api.get(`/landing/artisans/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el artesano:", error);
    throw error;
  }
};

export const postArtisan = async (artisanData) => {
  try {
    const response = await api.post("/landing/create/artisan", artisanData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el artesano:", error);
    throw error;
  }
};