import axios from "axios";
import apiClient from "./apiClient"

export const getProducts = async () => {
    const response =  await apiClient.get('products');
    return response.data;
}

export const getFeaturedProducts = async () => {
    const response =  await apiClient.get('product-featured');
    return response.data;
}

export const getFavorites = async () => {
    const response =  await apiClient.get('favorites');
    return response.data;
}

export const getViewed = async () => {
    const response =  await apiClient.get('viewed');
    return response.data;
}

export const getProductsById = async (id) => {
    const response =  await apiClient.get(`products/${id}`);
    return response.data;
}

export const getProductsByCategory = async (categoryId) => {
    const response =  await apiClient.get(`products?categoryId=${categoryId}`);
    return response.data;
}

export const getCategories = async (id) => {
    const response =  await apiClient.get('categories');
    return response.data;
}