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
      //const token = localStorage.getItem("token"); // TODO: configurar
      const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTczMjEzMDg0NiwiZXhwIjoxNzMyMjE3MjQ2fQ.BW-RGqoBu_Fj-n8TGhQjY93l-_yAjk7Dx8c34N58DMhW0ZXOmh5AN5NdREda7nZwHtDLg15sCZqP0xisY2MC1A";
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