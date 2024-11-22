import axios from "axios";

const baseUrlDev = 'http://localhost:3000/';
const baseUrlProd = 'http://localhost:8080/api/v1/';

const apiClient = axios.create({
    baseURL: baseUrlProd,
    headers: {
        "Content-Type": "application/json"
    }
});

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default apiClient;