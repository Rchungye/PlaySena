import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ className = "" }) => {
  const location = useLocation();

  // Mapeo de rutas a nombres de pantallas
  const routeNames = {
    "/" : 'Iniciar Sesion',
    "/registro": 'Registrarse',
    '/ranking': 'Tabla de Clasificacion',
    '/profile': 'Mi Perfil',
    '/help': 'Ayuda',
    '/etapas': 'Etapas',
    '/niveles': 'Niveles',
    '/lecciones': 'Lecciones',
    '/desafios': 'Desafíos',
    '/final': 'Final',
    '/admin/etapas': 'Administración de Etapas',
    '/admin/niveles': 'Administración de Niveles',
    '/admin/lecciones': 'Administración de Lecciones',
    '/admin/desafios': 'Administración de Desafíos',
    '/admin/opciones': 'Administración de Opciones',
    '/admin/users': 'Administración de Usuarios',
    '/admin/help': 'Administración de Ayuda'
  };

  // Obtener el nombre de la pantalla basado en la ruta actual
  const screenName = routeNames[location.pathname] || 'Pantalla Desconocida';

  return (
    <header className={`landing-page-header ${className} flex items-center justify-center`}>
      <img className="landing-page-header-icon mr-4" src="/src/assets/images/logo.png" alt="Header Icon" />
      <h1 className="text-2xl font-bold">{screenName}</h1>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
