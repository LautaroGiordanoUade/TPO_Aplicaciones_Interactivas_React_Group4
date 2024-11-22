
import React, { useState } from "react";
import { loginUser } from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Login = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await delay(5000);
    try {
      const user = await loginUser(email, password);
      
      if (user) {
        await login(email, password, user.id, user?.role);
        setLoading(false);
      }
    } catch (error) {
      setError("Las credenciales ingresadas son incorrectas");
      console.error(error);
      setLoading(false);
    }
  };

  const propsLoading = {
    text:'Ingresando, por favor espere...'
  }

  return (
    <form onSubmit={handleLogin}>
      {loading && <LoadingSpinner {...propsLoading}/>}
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      {error && <p className="text-danger">{error}</p>}
      <div className="mt-3">
        <a href="#!" onClick={() => setView('reset')}>¿Olvidaste tu contraseña?</a>
      </div>
    </form>
  );
};

export default Login;
