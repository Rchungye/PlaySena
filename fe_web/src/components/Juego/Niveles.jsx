// src/components/Juego/Niveles.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEtapasNiveles } from '../../services/Juego'; // Asegúrate de importar desde el archivo correcto

function Niveles() {
  const [nivelesData, setNivelesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const response = await obtenerEtapasNiveles();
        if (response.status === 200) {
          setNivelesData(response.data.flatMap(etapa => etapa.niveles));
        } else {
          setError('Error al obtener los niveles');
        }
      } catch (error) {
        setError('Error al obtener los niveles');
      } finally {
        setLoading(false);
      }
    };

    fetchNiveles();
  }, []);

  const handleNivelClick = (nivel) => {
    navigate('/lecciones');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Niveles</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nivelesData.map((nivel) => (
          <div 
            key={nivel.id_nivel} 
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
