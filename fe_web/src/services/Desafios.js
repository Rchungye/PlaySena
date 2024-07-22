import { ApiService } from './api.config';

// Registrar una nueva pregunta
export const registrarPregunta = async (pregunta) => {
  return ApiService.post('admin/preguntas/registrar', pregunta)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de una pregunta por ID
export const obtenerPregunta = async (idPregunta) => {
  return ApiService.get(`admin/preguntas/leer/${idPregunta}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar una pregunta existente
export const actualizarPregunta = async (pregunta) => {
  return ApiService.put('admin/preguntas/actualizar', pregunta)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar una pregunta por ID
export const eliminarPregunta = async (idPregunta) => {
  return ApiService.delete(`admin/preguntas/eliminar/${idPregunta}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
