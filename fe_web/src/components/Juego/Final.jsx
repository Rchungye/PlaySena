import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../store/UserContext';
import { actualizarExpUsuario } from '../../services/Juego';

function Final() {
  const { user, setUser } = useUser(); // Asegúrate de que 'setUser' esté disponible

  useEffect(() => {
    const updateExperience = async () => {
      if (user) {
        try {
          const response = await actualizarExpUsuario(user.id);
          if (response.status === 200) {
            console.log('Experiencia actualizada correctamente');
            // Suponiendo que la respuesta tiene la nueva experiencia
            const { newExperience } = await response.json(); 
            // Actualizar el contexto con la nueva experiencia
            setUser((prevUser) => ({
              ...prevUser,
              exp: newExperience // Actualiza con la nueva experiencia
            }));
          } else {
            console.error('Error al actualizar la experiencia');
          }
        } catch (error) {
          console.error('Error en la llamada a la API', error);
        }
      }
    };

    updateExperience();
  }, [user, setUser]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center flex-col">
        <h1 id="titulo" className="text-3xl font-bold mb-4">¡Felicidades!</h1>
        <p className="text-xl">Has completado todos los desafíos. Tu experiencia ha sido actualizada.</p>
        <Link to="/etapas" className="mt-4">
          <button id="btnFinalizar" className="bg-blue-500 text-white px-4 py-2 rounded">
            Regresar a la pantalla principal
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Final;
