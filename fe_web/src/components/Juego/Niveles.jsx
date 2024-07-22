import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerEtapasNiveles } from '../../services/Juego'; // Asegúrate de importar desde el archivo correcto
import Header from '../Header'; // Asegúrate de ajustar la ruta al archivo correcto

function Niveles() {
  const { idEtapa } = useParams(); // Obtener el ID de la etapa de la URL
  const [nivelesData, setNivelesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const response = await obtenerEtapasNiveles();
        if (response.status === 200) {
          // Filtrar niveles según el ID de la etapa
          const niveles = response.data.flatMap(etapa => 
            etapa.id === parseInt(idEtapa) ? etapa.niveles : []
          );
          setNivelesData(niveles);
          setError(null);
        } else {
          setError(`Error al obtener los niveles: ${response.status} - ${response.data}`);
        }
      } catch (error) {
        setError(`Error al obtener los niveles: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNiveles();
  }, [idEtapa]);

  const handleNivelClick = (nivel) => {
    navigate(`/lecciones/${nivel.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Header /> {/* Aquí se agrega el componente Header */}
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Niveles</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <h1 className="text-3xl font-bold">Cargando Niveles...</h1>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <h1 className="text-3xl font-bold">{error}</h1>
        </div>
      ) : nivelesData.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <h1 className="text-3xl font-bold">No hay niveles disponibles.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nivelesData.map((nivel) => (
            <div 
              key={nivel.id} 
              className="border p-4 rounded shadow-md cursor-pointer"
              onClick={() => handleNivelClick(nivel)}
            >
              <h2 className="text-xl font-bold">{nivel.nombre}</h2>
              <p className="text-gray-700">{nivel.descripcion}</p>
              <p className="text-gray-700">Experiencia requerida: {nivel.exp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Niveles;
