/**
 * User API service
 */

import axiosInstance from './axiosConfig';
import type { User } from '../types';

export const userService = {
    /**
     * Create a new user
     */
    createUser: async (user: User, codigoAdmin?: string) => {
        const params = codigoAdmin ? { codigoAdmin } : {};
        const response = await axiosInstance.post('/users/create', user, { params });
        return response.data;
    },

    /**
     * Login user
     */
    login: async (nombreUsuario: string, contrasena: string) => {
        const response = await axiosInstance.post('/users/login', {
            nombre_usuario: nombreUsuario,
            contrasena,
        });
        return response.data;
    },

    /**
     * Update user
     */
    updateUser: async (user: User) => {
        const response = await axiosInstance.put('/users/update', user);
        return response.data;
    },

    /**
     * Get user by ID
     */
    getUser: async (id: number) => {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    },
};
