//src/config/api.js
const BASE_URL = 'http://54.227.243.100:3000/api';

export const categoriaService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/categorias`);
    if (!response.ok) throw new Error('Error al obtener categorías');
    return response.json();
  },
  create: async (formData) => {
    const response = await fetch(`${BASE_URL}/categorias`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear categoría');
    }
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/categorias/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar categoría');
    return response.json();
  },
};

export const productoService = {
  getByCategoria: async (categoriaId) => {
    const response = await fetch(`${BASE_URL}/productos/${categoriaId}`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
  },
  create: async (formData) => {
    const response = await fetch(`${BASE_URL}/productos`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear producto');
    }
    return response.json();
  },
  update: async (id, producto) => {
    const response = await fetch(`${BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar producto');
    }
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/productos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return response.json();
  },
};

// Servicio para autenticación
export const authService = {
  // Inicio de sesión
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al iniciar sesión');
    }
    return response.json(); // Devuelve la respuesta JSON del servidor
  },

  // Registro de usuario
  register: async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al registrar usuario');
    }
    return response.json(); // Devuelve la respuesta JSON
  },
};


// Servicio para filtrar productos
export const filtrarProductos = async (filtros) => {
  try {
    const response = await fetch(`${BASE_URL}/productos/filtrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filtros),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al filtrar productos');
    }

    return await response.json(); // Devuelve los productos filtrados
  } catch (error) {
    console.error('Error en filtrarProductos:', error);
    throw error;
  }
};
export default BASE_URL;
