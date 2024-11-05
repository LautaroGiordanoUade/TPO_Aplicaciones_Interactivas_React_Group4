import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Cambia esto según tu configuración

export const getUser Profile = async () => {
    const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Suponiendo que usas JWT
        }
    });
    return response.data;
};

export const getUser Transactions = async () => {
    const response = await axios.get(`${API_URL}/user/transactions`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};