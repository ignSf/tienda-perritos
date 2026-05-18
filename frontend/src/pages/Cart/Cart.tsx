/**
 * Cart page
 */

import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import CartItemsList from '../../components/CartItemsList/CartItemsList';
import CartSummary from '../../components/CartSummary/CartSummary';
import EmptyCart from '../../components/EmptyCart/EmptyCart';

const Cart: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, total } = useCart();

    const handleCheckout = () => {
        alert('Funcionalidad de checkout próximamente!');
    };

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="cart-content">
                    <CartItemsList
                        items={cartItems}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                    <CartSummary total={total} onCheckout={handleCheckout} />
                </div>
            )}
        </div>
    );
};

export default Cart;
