// src/Routers/MainRouter.jsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthNavegator from './AuthNavegator';
import GameNavegator from './GameNavagator';

const MainRouter = () => {
  const location = useLocation();

  // Definir las rutas que corresponden a la autenticación
  const authRoutes = ["/", "/registro"];

  // Determinar si estamos en una ruta de autenticación
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <Routes>
      {isAuthRoute ? (
        <Route path="/*" element={<AuthNavegator />} />
      ) : (
        <Route path="/*" element={<GameNavegator />} />
      )}
    </Routes>
  );
};

export default MainRouter;
