import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEtapas } from '../../services/Juego'; // Asegúrate de que la ruta sea correcta
import Header from '../Header';
import NavBar from '../NavBar';

function Etapas() {
  const navigate = useNavigate();
  const [etapasData, setEtapasData] = useState([]);
  const [error, setError] = useState(null); // Agregar estado para manejar errores

  // Obtener las etapas desde la API
  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const response = await obtenerEtapas();
        if (response.status === 200) {
          setEtapasData(response.data);
          setError(null); // Limpiar el error si la respuesta es exitosa
        } else {
          setError(`Error al obtener etapas: ${response.data}`);
        }
      } catch (error) {
        setError(`Error al obtener etapas: ${error.message}`);
      }
    };

    fetchEtapas();
  }, []);

  // Función para manejar el clic en una etapa
  const handleClick = (idEtapa) => {
    navigate(`/niveles/${idEtapa}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Etapas</h1>
        </div>

        {error ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">{error}</h1>
          </div>
        ) : etapasData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">Cargando Etapas...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {etapasData.map((etapa) => (
              <div
                key={etapa.id}
                className="border p-4 rounded shadow-md cursor-pointer w-full"
                onClick={() => handleClick(etapa.id)}
              >
                <img
                  src={etapa.image_url || 'https://via.placeholder.com/150'} // Usa una imagen por defecto si no hay imagen
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
    </div>
  );
}

export default Etapas;
