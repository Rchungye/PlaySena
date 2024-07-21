import { ApiService } from './api.config';

// Obtener todas las etapas
export const obtenerEtapas = async () => {
    return ApiService.get('/etapas/all')
        .then(response => response.data)
        .catch(error => Promise.resolve(error.response));
};

// Obtener etapas y niveles
export const obtenerEtapasNiveles = async () => {
    return ApiService.get('/etapas/niveles')
        .then(response => response.data)
        .catch(error => Promise.resolve(error.response));
};

// Obtener desafíos para un nivel específico
export const obtenerDesafiosNivel = async (idNivel) => {
    return ApiService.get(`preguntas/nivel/${idNivel}`)
        .then(response => response.data)
        .catch(error => Promise.resolve(error.response));
};
