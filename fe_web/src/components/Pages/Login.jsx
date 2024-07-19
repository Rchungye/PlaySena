import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="lblEmail" className="label">Correo:</label>
          <input id='lblEmail' className="input" placeholder='Introduzca su correo' type='email' required />
        </div>
        <div>
          <label htmlFor="lblPassword" className="label">Contraseña:</label>
          <input id='lblPassword' className="input" placeholder='Introduzca su contraseña' type='password' required />
        </div>
        <div>
          <Link to="/etapas">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </Link>
        </div>
        <div>
          <Link to="/register">
            <button className="btn btn-secondary">Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
