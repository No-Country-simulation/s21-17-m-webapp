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

export const getArtisanByUserId = async (userId) => {
  try {
    const response = await api.get(`/landing/artisan/user/${userId}`);
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

export const updateArtisan = async (artisanData) => {
  try {
    const response = await api.put(
      `/landing/update/artisan`,
      artisanData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el artesano:", error);
    throw error;
  }
};
