import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = {username, password}; //usuario ya validado en el componente login , envia ya datos verificados
      setUser(response);
      console.log(user);
      //localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
