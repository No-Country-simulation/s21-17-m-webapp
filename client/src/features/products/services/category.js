import api from "../../../app/config/api";

// Obtener lista de categorías (GET)
export const getCategories = async () => {
  try {
    const response = await api.get("/categories/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};
