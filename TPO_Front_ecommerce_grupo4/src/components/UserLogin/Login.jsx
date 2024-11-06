
import React, { useState } from "react";
import { loginUser } from "../../services/userService";

const Login = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      if (user) {
        console.log("Usuario logeado:", user);
        localStorage.setItem('user', JSON.stringify(user));
        // Redirigir o actualizar desp de login exitoso
      }
    } catch (error) {
      setError("Error en el inicio de sesión");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
