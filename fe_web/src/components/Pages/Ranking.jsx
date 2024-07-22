import React, { useState, useEffect } from 'react';
import { listarRanking } from '../../services/Usuario'; // Ajusta la ruta según tu estructura de carpetas
import Header from '../Header';
import NavBar from '../NavBar';

function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await listarRanking();
        // Filtrar solo usuarios de tipo 1
        const usuariosTipo1 = data.filter(usuario => usuario.tipo === 1);
        // Ordenar por experiencia de mayor a menor
        const usuariosOrdenados = usuariosTipo1.sort((a, b) => b.exp - a.exp);
        // Obtener los primeros 10 usuarios
        const topUsuarios = usuariosOrdenados.slice(0, 10);
        setRankingData(topUsuarios);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="ranking-main-content flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Tabla de Clasificación</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">Cargando la tabla de clasificación.</h1>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">Error al cargar la tabla de clasificación..</h1>
          </div>
        ) : rankingData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">La tabla de Clasificación está en mantenimiento.</h1>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            {rankingData.map((jugador, index) => (
              <div key={index} className="flex items-center p-4 border rounded shadow-md">
                <div className="mr-4">
                  <img src={jugador.fotoPerfil} alt={jugador.nombre} className="w-12 h-12 rounded-full" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{jugador.nombre} {jugador.apellido}</h2>
                  <p className="text-gray-700">Posición: {index + 1}</p>
                  <p className="text-gray-700">Experiencia: {jugador.exp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Ranking;
