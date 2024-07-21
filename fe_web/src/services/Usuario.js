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
  return ApiService.put('/user/actualizar', usuario)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (idUsuario) => {
  return ApiService.delete(`/user/eliminar/${idUsuario}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Iniciar sesión de usuario
export const inicioUsuario = async (correo, contra) => {
  return ApiService.get('/user/login', {
    params: { correo, contra }
  })
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Obtener información de un usuario por ID
export const obtenerUsuario = async (idUsuario) => {
  return ApiService.get(`/user/obtenerUsuario/${idUsuario}`)
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};

// Listar ranking de usuarios
export const listarRanking = async () => {
  return ApiService.get('/Ranking')
    .then(response => response.data)
    .catch(error => Promise.resolve(error.response));
};
