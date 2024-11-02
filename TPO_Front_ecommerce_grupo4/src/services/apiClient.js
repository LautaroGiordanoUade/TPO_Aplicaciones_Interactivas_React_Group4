import axios from "axios";

const baseUrlDev = 'http://localhost:3000/';
const baseUrlProd = 'http://localhost:8080/api/v1/';

const apiClient = axios.create({
    baseURL: baseUrlDev,
    headers: {
        "Content-Type": "appication/json"
    }
})

export default apiClient;