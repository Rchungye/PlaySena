import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrarse</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="lblName" className="label">Nombre:</label>
          <input id='lblName' className="input" placeholder='Introduzca su nombre' required />
        </div>
        <div>
          <label htmlFor="lblLastName" className="label">Apellido:</label>
          <input id='lblLastName' className="input" placeholder='Introduzca su apellido' required />
        </div>
        <div>
          <label htmlFor="lblEmail" className="label">Correo:</label>
          <input id='lblEmail' className="input" placeholder='Introduzca su correo' type='email' required />
        </div>
        <div>
          <label htmlFor="lblPassword" className="label">Contraseña:</label>
          <input id='lblPassword' className="input" placeholder='Introduzca su contraseña' type='password' required />
        </div>
        <div>
          <label htmlFor="lblPasswordConfirm" className="label">Confirmar Contraseña:</label>
          <input id='lblPasswordConfirm' className="input" placeholder='Confirmar su contraseña' type='password' required />
        </div>
        <div>
          <Link to="/">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </Link>
        </div>
        <div>
          <Link to="/etapas">
            <button className="btn btn-secondary">Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
