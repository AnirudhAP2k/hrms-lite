import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v${import.meta.env.VITE_API_VERSION}`,
});

export default api;
