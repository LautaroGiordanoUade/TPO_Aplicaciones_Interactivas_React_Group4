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
    const tokenData = JSON.parse(localStorage.getItem("token"))
    const currentTime = Date.now(); 

    if (tokenData && tokenData.token) {
      const expirationTime = tokenData.expiration;
      if (currentTime > expirationTime) {
        return Promise.reject("Token expired");
      }
    } else {
      return Promise.reject("No token found");
    }

    if (tokenData && tokenData.token) {
      config.headers.Authorization = `Bearer ${tokenData.token}`;
    }

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;