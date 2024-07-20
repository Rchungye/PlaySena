import React from 'react';

function Desafios() {
  // Ejemplo de datos
  const opcionesData = [
    {
      nombre: 'Opción 1',
      imagen: 'https://example.com/imagen1.jpg'
    },
    {
      nombre: 'Opción 2',
      imagen: 'https://example.com/imagen2.jpg'
    }
  ];

  const DivOpciones = ({ nombre, imagen }) => (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold">{nombre}</h2>
      <img src={imagen} alt={nombre} className="mt-2 w-full h-40 object-cover rounded" />
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 id="titulo" className="text-3xl font-bold">Desafíos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {opcionesData.map((opcion, index) => (
          <DivOpciones
            key={index}
            nombre={opcion.nombre}
            imagen={opcion.imagen}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <button id="btnSiguiente" className="btn">Siguiente</button>
      </div>
    </div>
  );
}

export default Desafios;
