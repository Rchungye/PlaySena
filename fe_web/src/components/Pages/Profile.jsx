import React, { useState, useEffect } from 'react';
import Header from '../Header';
import NavBar from '../NavBar';
import { obtenerUsuario, actualizarUsuario } from '../../services/Usuario'; // Ajusta la ruta según tu estructura
import Swal from 'sweetalert2';

// Modal component
const Modal = ({ isOpen, onClose, onSave, userData }) => {
  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Apellido"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Correo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Correo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="contra"
              value={formData.contra}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Aquí debes obtener el ID del usuario de alguna manera, por ejemplo, del contexto o del localStorage
        const userId = 1; // Ejemplo: Reemplaza con el ID del usuario actual
        const data = await obtenerUsuario(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
        Swal.fire("Error", "No se pudo obtener la información del usuario. Inténtalo nuevamente.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveChanges = async (updatedUserData) => {
    try {
      await actualizarUsuario(updatedUserData);
      setUserData(updatedUserData);
      handleCloseModal();
      Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el perfil. Inténtalo nuevamente.", "error");
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Inicie sesión para poder ver su información</h1>
      </div>
    );
  }

  return (
    <div>
      <Header className="landing-page-header" />
      <NavBar className="navbar" />
      <main className="profile-main-content flex flex-col items-center p-4">
        <div className="text-center mb-4">
          <h1 id="titulo" className="text-2xl font-bold">Perfil</h1>
        </div>

        <div className="flex flex-col items-center mb-4">
          <img
            src={userData.fotoPerfil || "https://example.com/default-profile-picture.jpg"}
            alt="Foto de Perfil"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <div className="text-lg font-semibold mb-2">{userData.nombre} {userData.apellido}</div>
          <div className="text-gray-600 mb-2">{userData.email}</div>
          <div className="text-gray-600">Experiencia: {userData.exp} XP</div>
        </div>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={handleOpenModal}>Editar Perfil</button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          userData={userData}
        />
      </main>
    </div>
  );
}

export default Profile;
