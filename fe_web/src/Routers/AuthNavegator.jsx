import React from 'react';
import { Route, Routes } from 'react-router-dom';

// // // rutas de pagina
import Login from '../components/Pages/Login';
import Registro from '../components/Pages/Registro';

function AuthNavegator() {
  return (
    <div>
      <Routes>
        {/* rutas de pagina */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default AuthNavegator;
