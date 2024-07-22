import { ApiService } from './api.config';

// Registrar una nueva etapa
export const registrarEtapa = async (etapa) => {
  return ApiService.post('admin/etapas/registrar', etapa)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de una etapa por ID
export const obtenerEtapa = async (idEtapa) => {
  return ApiService.get(`admin/etapas/leer/${idEtapa}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar una etapa existente
export const actualizarEtapa = async (etapa) => {
  return ApiService.put('admin/etapas/actualizar', etapa)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar una etapa por ID
export const eliminarEtapa = async (idEtapa) => {
  return ApiService.delete(`admin/etapas/eliminar/${idEtapa}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
