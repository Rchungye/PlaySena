import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDesafiosNivel } from '../../services/Juego';
import Header from '../Header';
import NavBar from '../NavBar';

const Desafios = () => {
  const { idNivel } = useParams();
  const [desafios, setDesafios] = useState([]);
  const [currentDesafioIndex, setCurrentDesafioIndex] = useState(0); // Estado para el índice del desafío actual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respuesta, setRespuesta] = useState(''); // Estado para la respuesta del usuario
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null); // Estado para la respuesta correcta del desafío actual

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await obtenerDesafiosNivel(idNivel);
        if (response.status === 200) {
          setDesafios(response.data);
          if (response.data.length > 0) {
            setRespuestaCorrecta(response.data[0].respuestaCorrecta); // Suponiendo que cada desafío tiene una respuesta correcta
          }
        } else {
          setError('Error al obtener los desafíos');
        }
      } catch (err) {
        const errorMessage = err.response?.data || err.message || 'Error desconocido';
        setError(`Error al obtener los desafíos: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDesafios();
  }, [idNivel]);

  const handleRespuesta = () => {
    if (respuesta === respuestaCorrecta) {
      if (currentDesafioIndex < desafios.length - 1) {
        setCurrentDesafioIndex(currentDesafioIndex + 1);
        setRespuesta(''); // Limpiar la respuesta
        setRespuestaCorrecta(desafios[currentDesafioIndex + 1].respuestaCorrecta); // Actualizar la respuesta correcta
      } else {
        // Si no hay más desafíos, podrías redirigir al usuario a una página de finalización o mostrar un mensaje
        alert('¡Has completado todos los desafíos!');
      }
    } else {
      alert('Respuesta incorrecta, intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Desafíos</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">Cargando desafíos...</h1>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">{error}</h1>
          </div>
        ) : desafios.length > 0 ? (
          <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold">{desafios[currentDesafioIndex].pregunta}</h2>
            <img src={desafios[currentDesafioIndex].imagen} alt={desafios[currentDesafioIndex].pregunta} className="mt-2 w-full h-40 object-cover rounded" />
            <div className="my-4">
              <input
                type="text"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="text-center mt-8">
              <button
                id="btnSiguiente"
                onClick={handleRespuesta}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {currentDesafioIndex < desafios.length - 1 ? 'Siguiente' : 'Finalizar'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <h1 className="text-3xl font-bold">No se encontraron desafíos.</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Desafios;
