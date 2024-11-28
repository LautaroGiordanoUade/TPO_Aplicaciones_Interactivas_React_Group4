import apiClient from "./apiClient"
import apiClientPublic from "./apiClientPublic";

export const getProducts = async () => {
    const response =  await apiClientPublic.get('product');
    return response.data;
}
export const getFeaturedProducts = async () => {
    const response =  await apiClientPublic.get('product/featured');
    return response.data;
}
export const getFavorites = async () => {
    const response =  await apiClient.get('product/user/favorites');
    return response.data;
}
export const addFavorites = async (id) => {
    const response =  await apiClient.post(`product/user/favorite/${id}`);
    return response.data;
}
export const deleteFavorites = async (id) => {
    const response =  await apiClient.delete(`product/user/favorite/${id}`);
    return response.data;
}
export const getViewed = async () => {
    const response =  await apiClient.get('product/user/viewed');
    return response.data;
}
export const getProductsById = async (id) => {
    const user = localStorage.getItem("user");
    if (user != null) {
        const response =  await apiClient.get(`product/${id}`);
        return response.data;
    } else {
        const response =  await apiClientPublic.get(`product/${id}`);
        return response.data;
    }
}

export const getProductsByName = async (search) => {
    const response =  await apiClientPublic.get(`product?search=${search}`);
    return response.data;
}

export const getProductsByCategory = async (categoryId) => {
    const response =  await apiClientPublic.get(`product/category/${categoryId}`);
    return response.data;
}

export const getProductsByUser = async () => {
    const response =  await apiClient.get('product/admin');
    return response.data;
}

export const deleteProduct = async (id) => {
    const response =  await apiClient.delete(`product/admin/${id}`);
    return response.data;
}

export const createProduct = async (product) => {
    const response =  await apiClient.post('product/admin', product);
    return response.data;
}

export const editProduct = async (product) => {
    const response =  await apiClient.put(`product/admin`, JSON.stringify(product));
    return response.data;
}