
import { useState } from 'react';
import { registerUser } from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handlerSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    if (!username || !firstName || !lastName || !email || !password || !dob) {
      setError('Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }

    if (calculateAge(dob) < 18) {
      setError('Debes tener al menos 18 años para registrarte.');
      setLoading(false);
      return;
    }

    const minLoadingTime = 2000; //delay para mostrar el loading, solo 2 segundos
    const startTime = Date.now();

    const finalizeSignup = (isSuccess) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {           
            setLoading(false);
            if (isSuccess) {
              if (isSuccess) {
                setUsername('');
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setDob('');
              }
            }
        }, remainingTime);
    };

    try {
        const data = await registerUser(username, firstName, lastName, email, password, dob);
        localStorage.setItem('user', JSON.stringify(data));
        setSuccess('Usuario registrado con éxito');
        finalizeSignup(true);
    } catch (err) {
      if (err?.code !='ERR_NETWORK') {
        setError(err.response?.data || 'Error al registrar');
      } else {
        setError("Hay un error de conexión por favor intente mas tarde");
      }       
      finalizeSignup(false);
    }
};

  const propsLoading = {
    text:'Registrando, por favor espere...'
  }

  return (
    <div>
      {loading && <LoadingSpinner {...propsLoading} />}
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
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Fecha de nacimiento"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
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