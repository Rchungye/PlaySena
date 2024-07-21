import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEtapasNiveles } from '../../services/Juego'; // Ajusta la ruta según tu estructura
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

function Etapas() {
  const navigate = useNavigate();
  const [etapasData, setEtapasData] = useState([]);

  // Obtener las etapas y niveles desde la API
  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const response = await obtenerEtapasNiveles();
        setEtapasData(response);
      } catch (error) {
        console.error("Error al obtener etapas:", error);
      }
    };

    fetchEtapas();
  }, []);

  // Función para manejar el clic en una etapa
  const handleClick = (idEtapa) => {
    navigate(`/niveles/${idEtapa}`);
  };

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="etapas-main-content container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Etapas</h1>
        </div>

        {etapasData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">El juego está en mantenimiento.</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {etapasData.map((etapa) => (
              <div
                key={etapa.id_etapa}
                className="border p-4 rounded shadow-md cursor-pointer"
                onClick={() => handleClick(etapa.id_etapa)}
              >
                <img
                  src={etapa.imagen || 'https://via.placeholder.com/150'} // Usa una imagen por defecto si no hay imagen
                  alt={etapa.nombre}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold">{etapa.nombre}</h2>
                <p className="text-gray-700">{etapa.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer className="landing-page-footer" />
    </div>
  );
}

export default Etapas;
