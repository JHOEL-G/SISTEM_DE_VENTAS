export const guardarToken = (token) => {
    localStorage.setItem('token', token);
};

export const obtenerToken = () => {
    return localStorage.getItem('token');
};

export const estaAutenticado = () => {
    return !!obtenerToken();
};

export const cerrarSesion = () => {
    localStorage.removeItem('token');
};


export const API_URL = import.meta.env.VITE_API_URL;
