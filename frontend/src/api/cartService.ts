/**
 * Cart API service
 */

import axiosInstance from './axiosConfig';
import type { Cart } from '../types';

export const cartService = {
    /**
     * Add product to cart
     */
    /**
     * Add product to cart
     */
    addToCart: async (productId: number, quantity: number) => {
        const response = await axiosInstance.post('/cart/add', null, {
            params: { productId, quantity },
        });
        return response.data;
    },

    /**
     * Decrement product quantity in cart
     */
    decrementItem: async (productId: number) => {
        const response = await axiosInstance.post('/cart/decrement', null, {
            params: { productId },
        });
        return response.data;
    },

    /**
     * Clear cart
     */
    clearCart: async () => {
        const response = await axiosInstance.delete('/cart/clear');
        return response.data;
    },

    /**
     * Get cart items
     */
    getCartItems: async (): Promise<Cart[]> => {
        const response = await axiosInstance.get('/cart/items');
        return response.data;
    },

    /**
     * Get cart total
     */
    getCartTotal: async (): Promise<number> => {
        const response = await axiosInstance.get('/cart/total');
        return response.data;
    },
};
