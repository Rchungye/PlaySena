import React from 'react';
import { useNavigate } from 'react-router-dom';

function Niveles() {
  // Ejemplo de datos
  const nivelesData = [
    {
      nombre: 'Nivel 1',
      experiencia: 500
    },
    {
      nombre: 'Nivel 2',
      experiencia: 1000
    },
    // Añadir más niveles según sea necesario
  ];

  const navigate = useNavigate();

  const handleNivelClick = (nivel) => {
    // Aquí puedes añadir lógica para pasar parámetros o estado si es necesario
    navigate('/lecciones');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Niveles</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nivelesData.map((nivel, index) => (
          <div 
            key={index} 
            className="border p-4 rounded shadow-md cursor-pointer"
            onClick={() => handleNivelClick(nivel)}
          >
            <h2 className="text-xl font-bold">{nivel.nombre}</h2>
            <p className="text-gray-700">Experiencia requerida: {nivel.experiencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Niveles;
