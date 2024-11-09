
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {

    }, 5000);
    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem('user', JSON.stringify(data));
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirige al home
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  const propsLoading = {
    text:'Registrando, por favor espere...'
  }

  return (
    <div>
    {loading && <LoadingSpinner {...propsLoading}/>}
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">¡Registro exitoso!</div>}
      <button type="submit" className="btn btn-success w-100">Registrarse</button>
    </form>
    </div>
   
  );
};

export default Signup;