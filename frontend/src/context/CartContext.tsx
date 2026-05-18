/**
 * Cart Context for managing cart state
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { cartService } from '../api/cartService';
import type { Cart } from '../types';
import { useUser } from './UserContext';

export interface CartContextType {
    cartItems: Cart[];
    addToCart: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [total, setTotal] = useState<number>(0);

    const refreshCart = async () => {
        if (!user?.userid) {
            setCartItems([]);
            setTotal(0);
            return;
        }

        try {
            const [items, totalPrice] = await Promise.all([
                cartService.getCartItems(),
                cartService.getCartTotal()
            ]);

            setCartItems(items);
            setTotal(totalPrice);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [user]);

    const addToCart = async (productId: number, quantity: number) => {
        if (!user?.userid) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }

        try {
            await cartService.addToCart(productId, quantity);
            await refreshCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error al agregar producto al carrito');
        }
    };

    const removeFromCart = async (productId: number) => {
        if (!user?.userid) return;

        try {
            // Decrement until item is removed
            const item = cartItems.find(i => i.producto.idproducto === productId);
            if (item) {
                const promises = [];
                for (let i = 0; i < item.cantidad; i++) {
                    promises.push(cartService.decrementItem(productId));
                }
                await Promise.all(promises);
            }
            await refreshCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        if (!user?.userid) return;

        try {
            const item = cartItems.find(i => i.producto.idproducto === productId);
            if (!item) return;

            const diff = newQuantity - item.cantidad;

            if (diff > 0) {
                // Add more
                await cartService.addToCart(productId, diff);
            } else if (diff < 0) {
                // Remove some
                for (let i = 0; i < Math.abs(diff); i++) {
                    await cartService.decrementItem(productId);
                }
            }

            await refreshCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const clearCart = async () => {
        if (!user?.userid) return;

        try {
            await cartService.clearCart();
            await refreshCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, refreshCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
