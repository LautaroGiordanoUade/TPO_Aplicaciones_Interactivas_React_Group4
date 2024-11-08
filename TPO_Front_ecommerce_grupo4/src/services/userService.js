import apiClient from './apiClient';

export const getUser Profile = async (userId) => {
    const response = await apiClient.get(`users/${userId}`);
    return response.data;
};

export const getProductsCart = async () => {
    const response = await apiClient.get('cart-Products');
    return response.data;
};