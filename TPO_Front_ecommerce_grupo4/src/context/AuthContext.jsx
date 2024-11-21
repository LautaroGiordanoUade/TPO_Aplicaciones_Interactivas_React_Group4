import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password, userId) => {
    try {
      const response = {username, password, userId};
      setUser(response);
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    logOutUser();
    navigate("/userLogin");
  };

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
