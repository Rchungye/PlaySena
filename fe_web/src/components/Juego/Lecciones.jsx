import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerLeccion } from '../../services/Lecciones';
import Header from '../Header';
import NavBar from '../NavBar';

const Lecciones = () => {
  const { idLeccion } = useParams();
  const navigate = useNavigate(); // Hook para navegación
  const [leccion, setLeccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeccion = async () => {
      try {
        const response = await obtenerLeccion(idLeccion);
        if (response) {
          setLeccion(response);
          setError(null);
        } else {
          setError(`Error al obtener la lección: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        const errorMessage = err.response?.data || err.message || 'Error desconocido';
        setError(`Error al obtener la lección: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLeccion();
  }, [idLeccion]);

  const handleSiguiente = () => {
    navigate(`/desafios/${leccion.id}`); // Redirige al componente Desafios
  };

  const handleNivelClick = (nivel) => {
    navigate(`/lecciones/${nivel.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id='titulo' className="text-3xl font-bold">Lección</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">Cargando Lección...</h1>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">{error}</h1>
          </div>
        ) : leccion ? (
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
            <p><strong>Nivel:</strong> {leccion.nivel}</p>
            <p><strong>Nombre:</strong> {leccion.nombre}</p>
            <p><strong>Descripción:</strong> {leccion.descripcion}</p>
            <div className="my-4">
              <video controls className="w-full">
                <source src={leccion.video} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
            <div className="flex justify-end">
              <button id='btnSiguiente' className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSiguiente}>
                Siguiente
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">No se encontró la lección.</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default Lecciones;
