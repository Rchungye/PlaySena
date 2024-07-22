import { ApiService } from './api.config';

// Registrar una nueva lección
export const registrarLeccion = async (leccion) => {
  return ApiService.post('admin/lecciones/registrar', leccion)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de una lección por ID
export const obtenerLeccion = async (idLeccion) => {
  return ApiService.get(`admin/lecciones/leer/${idLeccion}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar una lección existente
export const actualizarLeccion = async (leccion) => {
  return ApiService.put('admin/lecciones/actualizar', leccion)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar una lección por ID
export const eliminarLeccion = async (idLeccion) => {
  return ApiService.delete(`admin/lecciones/eliminar/${idLeccion}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
