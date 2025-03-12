import api from "../../../app/config/api";

// Crear producto
export const postProduct = async (productData) => {
  try {
    const response = await api.post("/products/create", productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

export const getProductsByArtisan = async (artisanId) => {
  try {
    const response = await api.get(`/products/artisanlist/${artisanId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos del artesano:", error);
    throw error;
  }
};

export const updateProduct = async (productData) => {
  try {
    const response = await api.put(`/products/update`, productData);
    return response; //TODO: Refactor using data of updated product
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const updateProductStock = async (productId, quantity) => {
  try {
    const response = await api.put(`/products/${productId}/stock`, null, {
      params: { quantity },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el stock del producto:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

//detalle de compra
export const getProductsByBuyId = async (idBuy) => {
  try {
    const response = await api.get(`/api/products/purchasedsByBuyId/${idBuy}`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los productos de la compra:", error);
    throw error;
  }
};