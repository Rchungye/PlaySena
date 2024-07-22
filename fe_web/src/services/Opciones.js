import { ApiService } from './api.config';

// Registrar una nueva respuesta
export const registrarRespuesta = async (respuesta) => {
  return ApiService.post('admin/respuestas/registrar', respuesta)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de una respuesta por ID
export const obtenerRespuesta = async (idRespuesta) => {
  return ApiService.get(`admin/respuestas/leer/${idRespuesta}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar una respuesta existente
export const actualizarRespuesta = async (respuesta) => {
  return ApiService.put('admin/respuestas/actualizar', respuesta)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar una respuesta por ID
export const eliminarRespuesta = async (idRespuesta) => {
  return ApiService.delete(`admin/respuestas/eliminar/${idRespuesta}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
