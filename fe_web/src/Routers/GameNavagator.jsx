import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';


// rutas de pagina
import Ranking from '../components/Pages/Ranking';
import Profile from '../components/Pages/Profile';
import Help from '../components/Pages/Help';

// rutas de juego
import Etapas from '../components/Juego/Etapas';
import Niveles from '../components/Juego/Niveles';
import Lecciones from '../components/Juego/Lecciones';
import Desafios from '../components/Juego/Desafios';
import Final from '../components/Juego/Final';

// rutas de admin
import AdminHelp from '../components/Administracion/AdminHelp';
import AdminUsers from '../components/Administracion/AdminUsers';
import AdminEtapas from '../components/Administracion/AdminEtapas';
import AdminNiveles from '../components/Administracion/AdminNiveles';
import AdminLecciones from '../components/Administracion/AdminLecciones';
import AdminDesafios from '../components/Administracion/AdminDesafios';
import AdminOpciones from '../components/Administracion/AdminOpciones';

import NavBar from '../components/NavBar';


function GameNavegator() {
  const location = useLocation();
  const hideNavBarRoutes = ["/", "/registro"];

  return (
    <div className="flex">
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <div className={`p-4 flex-1 overflow-y-auto ${!hideNavBarRoutes.includes(location.pathname) ? 'ml-64' : ''}`}>
        <Routes>
          {/* rutas de pagina */}
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />

          {/* rutas de juego */}
          <Route path="/etapas" element={<Etapas />} />
          <Route path="/niveles" element={<Niveles />} />
          <Route path="/lecciones" element={<Lecciones />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/final" element={<Final />} />

          {/* rutas de admin */}
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
