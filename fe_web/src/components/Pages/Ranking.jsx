import React, { useState, useEffect } from 'react';
import { listarRanking } from '../../services/Usuario'; // Ajusta la ruta según tu estructura de carpetas

function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await listarRanking();
        setRankingData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Clasificación</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankingData.map((jugador, index) => (
          <div key={index} className="flex items-center p-4 border rounded shadow-md">
            <div className="mr-4">
              <img src={jugador.fotoPerfil} alt={jugador.nombre} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{jugador.nombre}</h2>
              <p className="text-gray-700">Posición: {jugador.posicion}</p>
              <p className="text-gray-700">Experiencia: {jugador.experiencia}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
