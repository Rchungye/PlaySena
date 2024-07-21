import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';

function Ranking() {
  // Ejemplo de datos
  const rankingData = [
    {
      posicion: 1,
      nombre: 'Jugador 1',
      fotoPerfil: 'https://example.com/jugador1.jpg',
      experiencia: 1500,
    },
    {
      posicion: 2,
      nombre: 'Jugador 2',
      fotoPerfil: 'https://example.com/jugador2.jpg',
      experiencia: 1200,
    },
    // Añadir más jugadores según sea necesario
  ];

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="ranking-main-content flex flex-col items-center justify-center p-4">
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
      </main>
      <Footer className="landing-page-footer" />
    </div>
  );
}

export default Ranking;
