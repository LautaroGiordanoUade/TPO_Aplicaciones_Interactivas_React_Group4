import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { logOutUser } from "./userService";

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
    const tokenData = JSON.parse(localStorage.getItem("token")); // Obtener el objeto del localStorage
    const navigate = useNavigate();

    if (tokenData && tokenData.token) {

      const decodedToken = JSON.parse(atob(tokenData.token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Verifica si el token se vencio (mismo tiempo establecido en back)
      if (decodedToken.exp < currentTime) {
        logOutUser()
        navigate("/login");
        return Promise.reject("Token expired");
      }

      // Si el token es válido, añadirlo al encabezado Authorization
      config.headers.Authorization = `Bearer ${tokenData.token}`;
    } else {
      // Si no hay token, redirigir al login
      navigate("/login"); // Redirigir al login si no hay token
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;