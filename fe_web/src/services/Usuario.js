import { ApiService } from './api.config';

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  return ApiService.get('/users/all')
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Registrar un nuevo usuario
export const registrarUsuario = async (usuario) => {
  return ApiService.post('/users/registrar', usuario)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Actualizar un usuario existente
export const actualizarUsuario = async (usuario) => {
  return ApiService.put('/users/actualizar', usuario)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (idUsuario) => {
  return ApiService.delete(`/users/eliminar/${idUsuario}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Iniciar sesión de usuario
export const inicioUsuario = async (correo, contra) => {
  return ApiService.post('/users/login', { email: correo, contra })
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de un usuario por ID
export const obtenerUsuario = async (idUsuario) => {
  return ApiService.get(`/users/obtenerUsuario/${idUsuario}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Listar ranking de usuarios
export const listarRanking = async () => {
  return ApiService.get('/Ranking')
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

export const obtenerAyuda = async () => {
  try {
    const response = await ApiService.get('/users/ayuda');
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener ayuda:', error);
    return Promise.reject(error.response); // Propaga el error
  }
};