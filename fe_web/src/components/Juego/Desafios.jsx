import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerDesafiosNivel } from '../../services/Juego';
import Header from '../Header';
import NavBar from '../NavBar';

const Desafios = () => {
  const { idNivel } = useParams();
  const navigate = useNavigate();
  const [desafios, setDesafios] = useState([]);
  const [currentDesafioIndex, setCurrentDesafioIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRespuesta, setSelectedRespuesta] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showRetryMessage, setShowRetryMessage] = useState(false);

  const correctSound = new Audio('/FB_Correct.mp3');
  const incorrectSound = new Audio('/FB_Incorrect.mp3');

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await obtenerDesafiosNivel(idNivel);
        if (response.status === 200) {
          setDesafios(response.data);
          if (response.data.length > 0) {
            const respuestas = response.data[0].respuestas;
            const respuestaCorrecta = respuestas.find(resp => resp.correcta);
            setRespuestaCorrecta(respuestaCorrecta);
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

  useEffect(() => {
    if (desafios.length > 0) {
      const respuestas = desafios[currentDesafioIndex].respuestas;
      const respuestaCorrecta = respuestas.find(resp => resp.correcta);
      setRespuestaCorrecta(respuestaCorrecta);
    }
  }, [currentDesafioIndex, desafios]);

  const handleRespuesta = () => {
    if (selectedRespuesta === respuestaCorrecta.id) {
      setShowCheckmark(true);
      correctSound.play(); // Reproduce el sonido correcto
      setTimeout(() => {
        setShowCheckmark(false);
        if (currentDesafioIndex < desafios.length - 1) {
          setCurrentDesafioIndex(currentDesafioIndex + 1);
          setSelectedRespuesta(null);
        } else {
          navigate('/final');
        }
      }, 1000); // Duración de la animación
    } else {
      setShowRetryMessage(true);
      incorrectSound.play(); // Reproduce el sonido incorrecto
      setTimeout(() => {
        setShowRetryMessage(false);
      }, 2000); // Duración del mensaje de intento fallido
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
          <div className="flex flex-col items-center justify-center p-6 border rounded shadow-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-center">{desafios[currentDesafioIndex].pregunta}</h2>
            {/* Mostrar animación y mensaje entre enunciado e imagen */}
            <div className="w-full max-w-md mb-4">
              <div className={`checkmark ${showCheckmark ? 'show-checkmark' : ''}`}></div>
              <div className={`retry-message ${showRetryMessage ? 'show-retry' : ''}`}>
                Intenta de nuevo.
              </div>
            </div>
            <img
              src={desafios[currentDesafioIndex].foto}
              alt={desafios[currentDesafioIndex].pregunta}
              className="mt-2 w-80 h-80 object-cover rounded mb-4"
            />
            <div className="my-4 w-full max-w-md">
              {desafios[currentDesafioIndex].respuestas.map((respuesta) => (
                <div key={respuesta.id} className="mb-2 flex items-center">
                  <input
                    type="radio"
                    id={`respuesta-${respuesta.id}`}
                    name="respuesta"
                    value={respuesta.id}
                    checked={selectedRespuesta === respuesta.id}
                    onChange={() => setSelectedRespuesta(respuesta.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`respuesta-${respuesta.id}`}>{respuesta.respuesta}</label>
                </div>
              ))}
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
