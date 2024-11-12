import apiClient from "./apiClient"

export const getProducts = async () => {
    const response =  await apiClient.get('products');
    return response.data;
}

export const getFeaturedProducts = async () => {
    const response =  await apiClient.get('products?featured=true&_limit=3');
    return response.data;
}

export const getFavorites = async () => {
    const response =  await apiClient.get('products?favorite=true&_limit=3');
    return response.data;
}

export const getViewed = async () => {
    const response =  await apiClient.get('products?viewed=true&_limit=3');
    return response.data;
}

export const getProductsById = async (id) => {
    const response =  await apiClient.get(`products/${id}`);
    return response.data;
}

export const getProductsByName = async (search) => {
    const response =  await apiClient.get(`products?name_like=${search}`);
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

export const postViewed = async () => {
    const response =  await apiClient.post('viewed');
    return response.data;
}

export const deleteProduct = async (id) => {
    const response =  await apiClient.delete(`products/${id}`);
    return response.data;
}

export const createProduct = async (product) => {
    const response =  await apiClient.post('products', product);
    return response.data;
}

export const editProduct = async (product) => {
    const response =  await apiClient.put(`products/${product.id}`, JSON.stringify(product));
    return response.data;
}