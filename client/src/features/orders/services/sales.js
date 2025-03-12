import api from "../../../app/config/api";

export const getProductsByArtisan = async (artisanId) => {
  try {
    const response = await api.get(`/products/artisanlist/${artisanId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos del artesano:", error);
    throw error;
  }
};

export const getSalesByProduct = async (productId) => {
  try {
    const response = await api.get(`/buy/buys/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas del producto:", error);
    throw error;
  }
};
