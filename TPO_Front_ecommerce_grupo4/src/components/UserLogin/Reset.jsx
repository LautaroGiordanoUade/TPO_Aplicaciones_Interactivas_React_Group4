
import React, { useState } from 'react';
import { resetPassword } from '../../services/userService';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const data = await resetPassword(email);
      setMessage('Correo de recuperación enviado');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo');
    }
  };

  return (
    <form onSubmit={handleReset}>
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
