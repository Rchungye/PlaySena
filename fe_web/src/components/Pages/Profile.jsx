import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';


// Modal component
const Modal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input type="text" className="border rounded p-2 w-full" placeholder="Nombre" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Apellido</label>
            <input type="text" className="border rounded p-2 w-full" placeholder="Apellido" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Correo</label>
            <input type="email" className="border rounded p-2 w-full" placeholder="Correo" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input type="password" className="border rounded p-2 w-full" placeholder="Contraseña" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveChanges = () => {
    // Logic to save changes
    handleCloseModal();
  };

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="profile-main-content flex flex-col items-center p-4">
        <div className="text-center mb-4">
          <h1 id="titulo" className="text-2xl font-bold">Perfil</h1>
        </div>

        <div className="flex flex-col items-center mb-4">
          <img src="https://example.com/profile-picture.jpg" alt="Foto de Perfil" className="w-32 h-32 object-cover rounded-full mb-4" />
          <div className="text-lg font-semibold mb-2">Nombre Apellido</div>
          <div className="text-gray-600 mb-2">correo@example.com</div>
          <div className="text-gray-600">Experiencia: 1200 XP</div>
        </div>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={handleOpenModal}>Editar Perfil</button>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveChanges} />
      </main>
      <Footer className="landing-page-footer" />
    </div>
  );
}

export default Profile;
