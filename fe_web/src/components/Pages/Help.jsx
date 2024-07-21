import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

function Ayuda() {
  // Ejemplo de datos
  const ayudaData = [
    {
      titulo: 'Ayuda 1',
      descripcion: 'Descripción de la Ayuda 1',
      contenidoURL: 'https://example.com/ayuda1',
    },
    {
      titulo: 'Ayuda 2',
      descripcion: 'Descripción de la Ayuda 2',
      contenidoURL: 'https://example.com/ayuda2',
    },
    // Añadir más ayudas según sea necesario
  ];

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="ayuda-main-content container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 id="titulo" className="text-3xl font-bold">Ayuda</h1>
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
      <Footer className="landing-page-footer" />
    </div>
  );
}

export default Ayuda;
