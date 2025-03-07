import api from "../../../app/config/api";

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
    const response = await api.post("/customer/save", customer);
    return response.data;
  } catch (error) {
    console.error("Error al crear el perfil de cliente:", error);
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
