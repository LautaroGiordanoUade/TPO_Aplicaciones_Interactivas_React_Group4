import apiClient from "./apiClient";
import apiClientPublic from "./apiClientPublic";

export const loginUser = async (email, password) => {
  const response = await apiClientPublic.post('auth/authenticate', { email, password });
  const userData = response.data;

  if (userData?.access_token) {
    const expirationTime = new Date().getTime() + 10 * 60 * 1000; // Tiempo actual + 10 minutos
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
  const response = await apiClient.post('auth/reset-password', { email });
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


//TODO: este es el que tenes que usar Flor, probalo y sino desp lo vemos (para editar los datos de profile, siendo user)
export const updateUser = async (id, userData) => {
  const response = await apiClient.patch(`user/profile`, userData);
  return response.data;
};

// y con este vas a traer los datos de usuario para mostrar , migralos a tu servicio profile y poneles el nombre con eso
// ya deberia funcionar, fijate q solamente hay q darle formato a la fecha
export const getUserData = async () => {
  const response = await apiClient.get(`user/profile`);
  return response.data;
};
