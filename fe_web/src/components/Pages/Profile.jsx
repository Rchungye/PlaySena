import React from 'react';

function Profile() {
  return (
    <div className="flex flex-col items-center p-4">

      <div className="w-full text-center mb-4">
        <h1 id="titulo" className="text-2xl font-bold">Perfil</h1>
      </div>

      <div className="w-full flex justify-center mb-4">
        {/* Aquí puedes agregar más contenido si es necesario */}
      </div>

      <div className="w-full flex justify-center">
        <button className="btn btn-primary">Editar Perfil</button>
      </div>

    </div>
  );
}

export default Profile;
