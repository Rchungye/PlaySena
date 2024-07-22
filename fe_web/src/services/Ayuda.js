import { ApiService } from './api.config';

// Obtener todas las ayudas
export const obtenerAyuda = async () => {
  return ApiService.get('/admin/ayuda')
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar una ayuda existente
export const actualizarAyuda = async (ayuda) => {
  return ApiService.put('/admin/ayuda/actualizar', ayuda)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar una ayuda por ID
export const eliminarAyuda = async (id) => {
  return ApiService.delete(`/admin/ayuda/eliminar/${id}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
