import { ApiService } from './api.config';

// Obtener todas las etapas
export const obtenerEtapas = async () => {
    try {
        const response = await ApiService.get('/etapas/all');
        return { status: response.status, data: response.data }; // Devolver un objeto con status y data
    } catch (error) {
        return { status: error.response?.status || 500, data: error.response?.data || 'Error' }; // Manejar el error y devolver un objeto con status y data
    }
};

// Obtener etapas y niveles
export const obtenerEtapasNiveles = async () => {
    try {
        const response = await ApiService.get('/etapas/niveles');
        return { status: response.status, data: response.data }; // Devuelve un objeto con status y data
    } catch (error) {
        // Devuelve un objeto con el status del error y el mensaje
        return { status: error.response?.status || 500, data: error.response?.data || 'Error desconocido' };
    }
};

// Obtener desafíos para un nivel específico
export const obtenerDesafiosNivel = async (idNivel) => {
    return ApiService.get(`/preguntas/nivel/${idNivel}`)
        .then(response => response.data)
        .catch(error => Promise.resolve(error.response));
};

// Actualizar experiencia de un usuario
export const actualizarExpUsuario = async (idUsuario) => {
    return ApiService.put(`/exp/${idUsuario}`)
        .then(response => response.data)
        .catch(error => Promise.resolve(error.response));
};
