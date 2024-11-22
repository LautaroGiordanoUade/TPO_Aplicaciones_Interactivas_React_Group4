import axios from "axios";

const baseUrlDev = 'http://localhost:3000/';
const baseUrlProd = 'http://localhost:8080/api/v1/';

const apiClientPublic = axios.create({
    baseURL: baseUrlProd,
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClientPublic;