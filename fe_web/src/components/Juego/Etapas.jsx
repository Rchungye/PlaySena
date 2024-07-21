import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

function Etapas() {
  const navigate = useNavigate();

  // Ejemplo de datos
  const etapasData = [
    {
      nombre: 'Etapa 1',
      descripcion: 'Descripción de la Etapa 1',
      imagen: 'https://example.com/etapa1.jpg',
    },
    {
      nombre: 'Etapa 2',
      descripcion: 'Descripción de la Etapa 2',
      imagen: 'https://example.com/etapa2.jpg',
    },
    // Añadir más etapas según sea necesario
  ];

  const handleClick = () => {
    navigate('/niveles');
  };

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="etapas-main-content container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Etapas</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {etapasData.map((etapa, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-md cursor-pointer"
              onClick={handleClick}
            >
              <img
                src={etapa.imagen}
                alt={etapa.nombre}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold">{etapa.nombre}</h2>
              <p className="text-gray-700">{etapa.descripcion}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer className="landing-page-footer" />
    </div>
  );
}

export default Etapas;
