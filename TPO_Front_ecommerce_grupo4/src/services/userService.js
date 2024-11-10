import apiClient from "./apiClient";

export const loginUser = async (email, password) => {
  const response = await apiClient.post('auth/login', { email, password });
  const userData = response.data;
  if (userData?.token) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return userData;
};

export const registerUser = async (username, email, password) => {
  const response = await apiClient.post('auth/register', { username, email, password });
  const userData = response.data;
  if (userData?.token) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return userData;
};

export const resetPassword = async (email) => {
  const response = await apiClient.post('auth/reset-password', { email });
  return response.data;
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
