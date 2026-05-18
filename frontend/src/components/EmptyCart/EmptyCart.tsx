/**
 * EmptyCart component
 */

import React from 'react';
import './EmptyCart.css';

const EmptyCart: React.FC = () => {
    return (
        <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar tu compra.</p>
        </div>
    );
};

export default EmptyCart;
