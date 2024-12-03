import apiClient from "./apiClient";
import apiClientPublic from "./apiClientPublic";

export const loginUser = async (email, password) => {
  const response = await apiClientPublic.post('auth/authenticate', { email, password });
  const userData = response.data;
  const tokenTimer = 0.5;

  if (userData?.access_token) {
    const expirationTime = new Date().getTime() + tokenTimer* 60 * 1000; // Tiempo actual + tokenTimer minutos
    const tokenData = {
      token: userData?.access_token,
      expiration: expirationTime,
    };
    localStorage.setItem("token",  JSON.stringify(tokenData));
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return userData;
};

export const registerUser = async (username, firstName, lastName, email, password, dob) => {

  const response = await apiClientPublic.post('user/register', {
    username,
    firstName,
    lastName,
    email,
    password,
    birthDate: new Date(dob).toISOString().split("T")[0]
  });
  
  const userData = response.data;

  return userData;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`user/admin/${id}`);
  return response.data;
};


export const resetPassword = async (email) => {
  const response = await apiClientPublic.get('user/checkEmail', {
    params: { email },
  });
  return response.data;
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logOutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};