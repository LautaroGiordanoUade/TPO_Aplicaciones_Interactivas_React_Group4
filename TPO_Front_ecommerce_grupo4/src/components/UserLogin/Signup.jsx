
import React, { useState } from 'react';
import { registerUser } from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlerSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const minLoadingTime = 5000; // Tiempo mínimo de carga
    const startTime = Date.now();

    const finalizeSignup = (isSuccess) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {           
            setLoading(false);
            if (isSuccess) {
              setUsername('');
              setEmail('');
              setPassword('');
            }
        }, remainingTime);
    };

    try {
        const data = await registerUser(username, email, password);
        localStorage.setItem('user', JSON.stringify(data));
        setSuccess('Usuario registrado con éxito');
        finalizeSignup(true);
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Error al registrar');
        finalizeSignup(false);
    }
};

  const propsLoading = {
    text:'Registrando, por favor espere...'
  }

  return (
    <div>
    {loading && <LoadingSpinner {...propsLoading}/>}
    <form onSubmit={handlerSignup}>
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
      {error &&<div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">¡Registro exitoso!</div>}
      <button type="submit" className="btn btn-success w-100">Registrarse</button>
    </form>
    </div>
   
  );
};

export default Signup;