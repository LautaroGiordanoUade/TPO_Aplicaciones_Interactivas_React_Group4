
import React, { useState } from 'react';
import { resetPassword } from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleReset = async (e) => {
    setLoading(true);
    setError('');
    setMessage('')
    e.preventDefault();
    await delay(1000);
    try {
      const data = await resetPassword(email);
      setMessage(data);
    } catch (err) {
      setError('El usuario no existe, ingrese otro mail');
    } finally {
      setLoading(false);
    }
  };

  const propsLoading = {
    text:'Enviado mail de recuperacion de contraseña, por favor espere...'
  }

  return (
    <form onSubmit={handleReset}>
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
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <button type="submit" className="btn btn-warning w-100">Restablecer Contraseña</button>
    </form>
  );
};

export default Reset;
