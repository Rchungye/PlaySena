import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Jugador</h1>
      </div>

      <div className="flex flex-col space-y-2 w-full items-center">
        <Link to={"/etapas"}>
          <button className="btn">Etapas</button>
        </Link>
        <Link to={"/ranking"}>
          <button className="btn">Clasificación</button>
        </Link>
        <Link to={"/profile"}>
          <button className="btn">Perfil</button>
        </Link>
        <Link to={"/help"}>
          <button className="btn">Ayuda</button>
        </Link>
      </div>

      <div className="w-full text-center mt-8">
        <h1 className="text-2xl font-bold mb-4">Administrador</h1>
      </div>

      <div className="flex flex-col space-y-2 w-full items-center">
        <Link to={"/admin/etapas"}>
          <button className="btn">Administrar Etapas</button>
        </Link>
        <Link to={"/admin/niveles"}>
          <button className="btn">Administrar Niveles</button>
        </Link>
        <Link to={"/admin/lecciones"}>
          <button className="btn">Administrar Lecciones</button>
        </Link>
        <Link to={"/admin/desafios"}>
          <button className="btn">Administrar Desafíos</button>
        </Link>
        <Link to={"/admin/opciones"}>
          <button className="btn">Administrar Opciones</button>
        </Link>
        <Link to={"/admin/users"}>
          <button className="btn">Administrar Usuarios</button>
        </Link>
        <Link to={"/admin/help"}>
          <button className="btn">Administrar Ayuda</button>
        </Link>
      </div>

      <div className="w-full text-center mt-8">
        <Link to="/">
          <button className="btn">Cerrar Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
