import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSignInAlt, FaUserPlus, FaTachometerAlt, FaStar, FaUser, FaSearch, FaHome, FaQuestion, FaCogs, FaBook, FaPlus, FaUsers } from 'react-icons/fa'; // Importar iconos

const Header = ({ className = "" }) => {
  const location = useLocation();

  // Mapeo de rutas a nombres de pantallas y iconos
  const routeDetails = {
    "/" : { name: 'Iniciar Sesion'},
    "/registro": { name: 'Registrarse'},
    '/ranking': { name: 'Tabla de Clasificacion', icon: <FaStar className="mr-2" /> },
    '/profile': { name: 'Mi Perfil', icon: <FaUser className="mr-2" /> },
    '/help': { name: 'Ayuda', icon: <FaSearch className="mr-2" /> },
    '/etapas': { name: 'Etapas', icon: <FaHome className="mr-2" /> },
    '/niveles': { name: 'Niveles', icon: <FaTachometerAlt className="mr-2" /> },
    '/lecciones': { name: 'Lecciones', icon: <FaBook className="mr-2" /> },
    '/desafios': { name: 'Desafíos', icon: <FaQuestion className="mr-2" /> },
    '/final': { name: 'Final', icon: <FaQuestion className="mr-2" /> },
    '/admin/etapas': { name: 'Administración de Etapas', icon: <FaCogs className="mr-2" /> },
    '/admin/niveles': { name: 'Administración de Niveles', icon: <FaTachometerAlt className="mr-2" /> },
    '/admin/lecciones': { name: 'Administración de Lecciones', icon: <FaBook className="mr-2" /> },
    '/admin/desafios': { name: 'Administración de Desafíos', icon: <FaQuestion className="mr-2" /> },
    '/admin/opciones': { name: 'Administración de Opciones', icon: <FaPlus className="mr-2" /> },
    '/admin/users': { name: 'Administración de Usuarios', icon: <FaUsers className="mr-2" /> },
    '/admin/help': { name: 'Administración de Ayuda', icon: <FaQuestion className="mr-2" /> }
  };

  // Verificar si la ruta actual coincide con una ruta base y tiene parámetros
  const getHeaderDetails = (pathname) => {
    for (const route in routeDetails) {
      // Verifica si la ruta base coincide
      if (pathname === route || pathname.startsWith(route + '/')) {
        return routeDetails[route];
      }
    }
    return { name: 'Pantalla Desconocida', icon: <FaQuestion className="mr-2" /> };
  };

  // Obtener el nombre y el icono basado en la ruta actual
  const { name: screenName, icon } = getHeaderDetails(location.pathname);

  return (
    <header className={`landing-page-header ${className} flex items-center justify-center`}>
      {/* Mostrar el logo solo en las pantallas de inicio de sesión y registro */}
      {(location.pathname === "/" || location.pathname === "/registro") && (
        <img className="landing-page-header-icon mr-4" src="/src/assets/images/logo.png" alt="Header Icon" />
      )}
      <h1 className="text-2xl font-bold flex items-center">
        {icon}
        {screenName}
      </h1>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
