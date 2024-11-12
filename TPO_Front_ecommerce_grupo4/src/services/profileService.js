import apiClient from './apiClient';

// Obtener perfil de usuario
export const getUserProfile = async (userId) => {
    try {
        const response = await apiClient.get(`users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        throw error;
    }
};

// Obtener historial de compras del usuario
export const getUserPurchases = async (userId) => {
    try {
        const response = await apiClient.get(`users/${userId}/purchases`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las compras del usuario:", error);
        throw error;
    }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await apiClient.put(`users/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el perfil del usuario:", error);
        throw error;
    }
};

