import apiClientPublic from "./apiClientPublic";

export const getCategories = async (id) => {
    const response =  await apiClientPublic.get('category');
    return response.data;
}

export const getCategoryById = async (id) => {
    const response =  await apiClientPublic.get(`category/${id}`);
    return response.data;
}
