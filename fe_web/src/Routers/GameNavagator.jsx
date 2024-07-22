import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useUser } from '../store/UserContext'; // Asegúrate de ajustar la ruta al archivo correcto

// Rutas de página
import Ranking from '../components/Pages/Ranking';
import Profile from '../components/Pages/Profile';
import Help from '../components/Pages/Help';

// Rutas de juego
import Etapas from '../components/Juego/Etapas';
import Niveles from '../components/Juego/Niveles';
import Lecciones from '../components/Juego/Lecciones';
import Desafios from '../components/Juego/Desafios';
import Final from '../components/Juego/Final';

// Rutas de admin
import AdminHelp from '../components/Administracion/AdminHelp';
import AdminUsers from '../components/Administracion/AdminUsers';
import AdminEtapas from '../components/Administracion/AdminEtapas';
import AdminNiveles from '../components/Administracion/AdminNiveles';
import AdminLecciones from '../components/Administracion/AdminLecciones';
import AdminDesafios from '../components/Administracion/AdminDesafios';
import AdminOpciones from '../components/Administracion/AdminOpciones';

import Header from '../components/Header'; // Asegúrate de ajustar la ruta al archivo correcto
import NavBar from '../components/NavBar';

function GameNavegator() {
  const location = useLocation();
  const hideNavBarRoutes = ["/", "/registro"];
  const { user } = useUser(); // Obtener la información del usuario desde el contexto

  return (
    <div className="flex">
      {/* Mostrar Header en todas las rutas, excepto en las páginas de inicio de sesión y registro */}
      {location.pathname !== "/" && location.pathname !== "/registro" && <Header />}

      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <div className={`p-4 flex-1 overflow-y-auto ${!hideNavBarRoutes.includes(location.pathname) ? 'ml-64' : ''}`}>
        <Routes>
          {/* Rutas de página */}
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />

          {/* Rutas de juego */}
          <Route path="/etapas" element={<Etapas />} />
          <Route path="/niveles/:idEtapa" element={<Niveles />} /> {/* Ruta actualizada */}
          <Route path="/lecciones" element={<Lecciones />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/final" element={<Final />} />

          {/* Rutas de admin */}
          <Route path="/admin/etapas" element={<AdminEtapas />} />
          <Route path="/admin/niveles" element={<AdminNiveles />} />
          <Route path="/admin/lecciones" element={<AdminLecciones />} />
          <Route path="/admin/desafios" element={<AdminDesafios />} />
          <Route path="/admin/opciones" element={<AdminOpciones />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/help" element={<AdminHelp />} />
        </Routes>
      </div>
    </div>
  );
}

export default GameNavegator;
