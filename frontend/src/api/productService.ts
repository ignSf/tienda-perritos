/**
 * Product API service
 */

import axiosInstance from './axiosConfig';
import type { Product } from '../types';

export const productService = {
    /**
     * Get all products
     */
    getProducts: async () => {
        const response = await axiosInstance.get('/products');
        return response.data;
    },

    /**
     * Search products by name
     */
    searchProducts: async (nombre: string) => {
        const response = await axiosInstance.get('/products/search', {
            params: { nombre },
        });
        return response.data;
    },

    /**
     * Create a new product
     */
    /**
     * Create a new product
     */
    createProduct: async (product: Product) => {
        const response = await axiosInstance.post('/products/create', product);
        return response.data;
    },

    /**
     * Update a product
     */
    updateProduct: async (product: Product) => {
        const response = await axiosInstance.put('/products/update', product);
        return response.data;
    },

    /**
     * Delete a product
     */
    deleteProduct: async (id: number) => {
        const response = await axiosInstance.delete(`/products/delete/${id}`);
        return response.data;
    },
};
