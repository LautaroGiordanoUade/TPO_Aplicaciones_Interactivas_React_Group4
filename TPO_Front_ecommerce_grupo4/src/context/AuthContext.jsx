import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../services/userService";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(""); 
  const navigate = useNavigate();

  const login = async (username, password, userId, role) => {
    try {
      const response = { username, password, userId, role };
      setUser(response);
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const setOutUser = () => {
    setUser(null);
    setLoading(false); 
    setShowToast(false); 
  }

  const logout = async (reason="logout") => {
    logOutUser();
    if (reason=='tokenExpired') {
      try {
        setLoading(true);
        setToastMessage("La sesión expiró, por favor vuelva a ingresar");
        setShowToast(true);
        setTimeout(() => {
          setOutUser();
        }, 2000);
        navigate("/userLogin");
      } catch (err) {
        setError("Ocurrió un error al cerrar sesión");
        setLoading(false);
    }
    }else {
      setOutUser(); 
      navigate("/userLogin");
    }
    
};

  useEffect(() => {
    setError(null);
  }, [user]);

  const propsLoading = {
    text:'Re dirigiendo al loggin, por favor espere...'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {loading && (<LoadingSpinner {...propsLoading} />)}
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant="success"
      />

      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;