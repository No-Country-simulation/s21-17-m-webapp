import api from "../../../app/config/api";
import { getProductsByBuyId } from "../../products/services/products"; 

export const getCustomersByUserId = async (userId) => {
  try {
    const response = await api.get(`/customer/userlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el artesano:", error);
    throw error;
  }
};

export const postCustomer = async (customer) => {
  try {
    const response = await api.post("/customer/create", customer);
    return response.data;
  } catch (error) {
    console.error("Error al crear el perfil de cliente:", error);
    throw error;
  }
};

export const updateCustomer = async (customer) => {
  try {
    const response = await api.put(`/customer/update`, customer);
    return response; //TODO: Refactor using data of updated customer
  } catch (error) {
    console.error("Error al actualizar el perfil de cliente:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await api.delete(`/customer/delete/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el perfil de cliente:", error);
    throw error;
  }
};


export const getBuysByCustomerId = async (customerId) => {
  try {
    const response = await api.get(`/buy/details/${customerId}`);
    const buys = response.data;

    for (let buy of buys) {
      const products = await getProductsByBuyId(buy.idBuy); 
      buy.purchasedProducts = products; 
    }

    return buys; 
  } catch (error) {
    console.error("Error al obtener las compras y productos:", error);
    throw error;
  }
};
