import React, { useState } from 'react';
import Login from '../components/UserLogin/Login';
import Signup from '../components/UserLogin/Signup';
import FooterLogin from '../components/UserLogin/FooterLogin';
import Reset from '../components/UserLogin/Reset';

const UserLogin = () => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'reset'

    const handlerSetView = (newValueView) => {
        setView(newValueView);
    }

    const propsFooter = {
        view,
        setView: handlerSetView,
    }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
          <h2 className="card-title mb-4">
            {view === 'login' ? 'Iniciar Sesión' : view === 'signup' ? 'Crear Cuenta' : 'Restablecer Contraseña'}
          </h2>
          {view === 'login' && <Login setView={handlerSetView}/>}
          {view === 'signup' && <Signup/>}
          {view === 'reset' && <Reset/>}
          <div className="mt-4">
            <FooterLogin {...propsFooter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
