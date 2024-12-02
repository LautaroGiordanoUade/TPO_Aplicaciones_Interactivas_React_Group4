import apiClient from "./apiClient";

// Formato de fechas en: YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Obtener perfil de usuario por ID
export const getUserProfile = async (userId) => {
  try {
    const response = await apiClient.get("user/profile");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (userId, profileData) => {
  try {
    // Formatear fecha si existe antes de enviar al backend
    if (profileData.birthDate) {
      profileData.birthDate = formatDate(profileData.birthDate);
    }
    const response = await apiClient.patch("user/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
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