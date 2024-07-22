import React, { useEffect, useState } from 'react';
import Header from '../Header';
import NavBar from '../NavBar';
import { obtenerAyuda } from '../../services/Usuario'; // Ajusta la ruta según tu estructura de carpetas

function Ayuda() {
  const [ayudaData, setAyudaData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAyudaData = async () => {
      try {
        const data = await obtenerAyuda();
        setAyudaData(data);
      } catch (error) {
        setError('Error al obtener la información de ayuda');
      } finally {
        setCargando(false);
      }
    };

    fetchAyudaData();
  }, []);

  if (cargando) {
    return (
      <div>
        <Header className="landing-page-header" />
        <NavBar className="navbar" />
        <main className="ayuda-main-content container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 id="titulo" className="text-3xl font-bold">Ayuda</h1>
            <p>Cargando...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header className="landing-page-header" />
        <NavBar className="navbar" />
        <main className="ayuda-main-content container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 id="titulo" className="text-3xl font-bold">Ayuda</h1>
            <p>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="ayuda-main-content container mx-auto p-4">
      <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">AYUDA</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ayudaData.map((ayuda, index) => (
            <div key={index} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{ayuda.titulo}</h2>
              <p className="text-gray-700">{ayuda.descripcion}</p>
              <a
                href={ayuda.contenidoURL}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver más
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Ayuda;
