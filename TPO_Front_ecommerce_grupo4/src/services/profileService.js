import apiClient from './apiClient';

let cachedUserProfile = null;
let cachedCartProducts = null;

export const getUserProfile = async (userId) => {
    try {
        // Verificar si ya existe un perfil en caché
        if (cachedUserProfile && cachedUserProfile.id === userId) {
            return cachedUserProfile;
        }

        const response = await apiClient.get(`users/${userId}`);
        cachedUserProfile = response.data; // Almacenar en caché el perfil de usuario
        return cachedUserProfile;
    } catch (error) {
        console.error("Error al obtener el perfil de usuario:", error);
        throw new Error("No se pudo obtener el perfil del usuario. Inténtalo nuevamente.");
    }
};

export const getProductsCart = async () => {
    try {
        // Verificar si ya existen productos en el carrito en caché
        if (cachedCartProducts) {
            return cachedCartProducts;
        }

        const response = await apiClient.get('cart-Products');
        cachedCartProducts = response.data; // Almacenar en caché los productos del carrito
        return cachedCartProducts;
    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error);
        throw new Error("No se pudo obtener el carrito de compras. Inténtalo nuevamente.");
    }
};

// Función para limpiar la caché (útil si el usuario actualiza su perfil o el carrito cambia)
export const clearCache = () => {
    cachedUserProfile = null;
    cachedCartProducts = null;
};


