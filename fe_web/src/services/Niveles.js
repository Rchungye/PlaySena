import { ApiService } from './api.config';

// Registrar un nuevo nivel
export const registrarNivel = async (nivel) => {
  return ApiService.post('admin/niveles/registrar', nivel)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de un nivel por ID
export const obtenerNivel = async (idNivel) => {
  return ApiService.get(`admin/niveles/leer/${idNivel}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar un nivel existente
export const actualizarNivel = async (nivel) => {
  return ApiService.put('admin/niveles/actualizar', nivel)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar un nivel por ID
export const eliminarNivel = async (idNivel) => {
  return ApiService.delete(`admin/niveles/eliminar/${idNivel}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
