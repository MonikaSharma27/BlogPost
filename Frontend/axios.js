import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
  // Remove methods and allowedHeaders as they are not valid axios config options
});





export default axiosInstance;
