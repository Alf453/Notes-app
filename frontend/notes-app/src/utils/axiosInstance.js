import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: BASE_URL,
=======
  baseURL: "https://notes-app-qyxw.onrender.com",
>>>>>>> 7c66753dee6b91fbd110c485760a80e2282e25dd
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
