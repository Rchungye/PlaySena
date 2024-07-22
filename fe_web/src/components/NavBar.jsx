import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaStar, FaSearch, FaUser } from 'react-icons/fa';
import { useUser } from '../store/UserContext'; // Ajusta la ruta según tu estructura

function NavBar() {
  const { user } = useUser(); // Obtener la información del usuario desde el contexto

  return (
    <nav className="navbar">
      <div className="w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {user?.tipo === 1 ? 'Jugador' : 'Administrador'}
        </h1>
      </div>
      <div className="flex flex-col space-y-2 w-full items-center">
        {/* Opciones comunes */}
        <Link to="/etapas">
          <button className="btn flex items-center">
            <FaHome className="mr-2" /> <span>Etapas</span>
          </button>
        </Link>
        <Link to="/ranking">
          <button className="btn flex items-center">
            <FaStar className="mr-2" /> <span>Clasificación</span>
          </button>
        </Link>
        <Link to="/profile">
          <button className="btn flex items-center">
            <FaUser className="mr-2" /> <span>Perfil</span>
          </button>
        </Link>
        <Link to="/help">
          <button className="btn flex items-center">
            <FaSearch className="mr-2" /> <span>Ayuda</span>
          </button>
        </Link>

        {/* Opciones administrativas, solo visibles para tipo 2 */}
        {user?.tipo === 2 && (
          <>
            <div className="w-full text-center mt-8">
              <h1 className="text-2xl font-bold mb-4">Administrador</h1>
            </div>
            <Link to="/admin/etapas">
              <button className="btn">Administrar Etapas</button>
            </Link>
            <Link to="/admin/niveles">
              <button className="btn">Administrar Niveles</button>
            </Link>
            <Link to="/admin/lecciones">
              <button className="btn">Administrar Lecciones</button>
            </Link>
            <Link to="/admin/desafios">
              <button className="btn">Administrar Desafíos</button>
            </Link>
            <Link to="/admin/opciones">
              <button className="btn">Administrar Opciones</button>
            </Link>
            <Link to="/admin/users">
              <button className="btn">Administrar Usuarios</button>
            </Link>
            <Link to="/admin/help">
              <button className="btn">Administrar Ayuda</button>
            </Link>
          </>
        )}
      </div>
      <div className="w-full text-center mt-8">
        <Link to="/">
          <button className="btn">Cerrar Sesión</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
