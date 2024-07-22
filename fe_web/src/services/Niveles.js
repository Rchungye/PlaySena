import { ApiService } from './api.config';

// Registrar un nuevo nivel
export const registrarNivel = async (nivel) => {
  try {
    const response = await ApiService.post('admin/niveles/registrar', nivel);
    return response;
  } catch (error) {
    return Promise.resolve(error.response);
  }
};

// Obtener información de todos los niveles
export const obtenerNiveles = async () => {
  try {
    const response = await ApiService.get('admin/niveles/leer');
    return response;
  } catch (error) {
    return Promise.resolve(error.response);
  }
};

// Actualizar un nivel existente
export const actualizarNivel = async (nivel) => {
  try {
    const response = await ApiService.put('admin/niveles/actualizar', nivel);
    return response;
  } catch (error) {
    return Promise.resolve(error.response);
  }
};

// Eliminar un nivel por ID
export const eliminarNivel = async (idNivel) => {
  try {
    const response = await ApiService.delete(`admin/niveles/eliminar/${idNivel}`);
    return response;
  } catch (error) {
    return Promise.resolve(error.response);
  }
};
