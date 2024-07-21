// src/components/Juego/Desafios.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDesafiosNivel } from '../../services/Juego'; // Asegúrate de importar desde el archivo correcto

function Desafios() {
  const { idNivel } = useParams(); // Obtén el ID del nivel desde los parámetros de la ruta
  const [desafiosData, setDesafiosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await obtenerDesafiosNivel(idNivel);
        if (response.status === 200) {
          setDesafiosData(response.data);
        } else {
          setError('Error al obtener los desafíos');
        }
      } catch (error) {
        setError('Error al obtener los desafíos');
      } finally {
        setLoading(false);
      }
    };

    fetchDesafios();
  }, [idNivel]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Desafíos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {desafiosData.map((desafio) => (
          <div key={desafio.id_pregunta} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold">{desafio.pregunta}</h2>
            <img src={desafio.imagen} alt={desafio.pregunta} className="mt-2 w-full h-40 object-cover rounded" />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button id="btnSiguiente" className="btn">Siguiente</button>
      </div>
    </div>
  );
}

export default Desafios;
