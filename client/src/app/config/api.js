import axios from "axios";
import { getEnvVariables } from "../../shared/constants/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();
const api = axios.create({
  baseURL: VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers = {
    ...config.headers,
    AUTHORIZATION: token ? `Bearer ${token}` : "",
  };
  return config;
});

export default api;
