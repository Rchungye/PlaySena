import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaStar, FaSearch, FaUser, FaCogs, FaBook, FaQuestion, FaUsers, FaTachometerAlt, FaPlus } from 'react-icons/fa'; // Importar íconos
import { useUser } from '../store/UserContext'; // Ajusta la ruta según tu estructura

// Importa el logo
import logo from '../../src/assets/images/logo.png'; // Ajusta la ruta según tu estructura

function NavBar() {
  const { user } = useUser(); // Obtener la información del usuario desde el contexto

  return (
    <nav className="navbar">
      <div className="w-full text-center mb-4">
        <div className="flex items-center justify-center space-x-2">
          <img
            src={user?.fotoPerfil} // Foto de perfil del usuario
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-bold">{user?.nombre} {user?.apellido}</p>
            <p>Experiencia: {user?.exp}</p>
            <p>{user?.tipo === 1 ? 'Jugador' : 'Administrador'}</p>
          </div>
        </div>
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
              <h1 className="text-2xl font-bold m-4">Opciones de Gestión</h1>
            </div>
            <Link to="/admin/etapas">
              <button className="btn flex items-center">
                <FaCogs className="mr-2" /> <span>Etapas</span>
              </button>
            </Link>
            <Link to="/admin/niveles">
              <button className="btn flex items-center">
                <FaTachometerAlt className="mr-2" /> <span>Niveles</span>
              </button>
            </Link>
            <Link to="/admin/lecciones">
              <button className="btn flex items-center">
                <FaBook className="mr-2" /> <span>Lecciones</span>
              </button>
            </Link>
            <Link to="/admin/desafios">
              <button className="btn flex items-center">
                <FaQuestion className="mr-2" /> <span>Desafíos</span>
              </button>
            </Link>
            <Link to="/admin/opciones">
              <button className="btn flex items-center">
                <FaPlus className="mr-2" /> <span>Opciones</span>
              </button>
            </Link>
            <Link to="/admin/users">
              <button className="btn flex items-center">
                <FaUsers className="mr-2" /> <span>Usuarios</span>
              </button>
            </Link>
            <Link to="/admin/help">
              <button className="btn flex items-center">
                <FaQuestion className="mr-2" /> <span>Ayuda</span>
              </button>
            </Link>
          </>
        )}
      </div>
      {/* Logo y nombre de la página */}
      <div className="w-full text-center mt-8">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo de PlaySeña"
          />
        </div>
        <h1 className="text-xl font-bold">PlaySeña</h1>
      </div>
    </nav>
  );
}

export default NavBar;
