/**
 * CartSummary component
 */

import React from 'react';
import './CartSummary.css';
import Button from '../Button/Button';

interface CartSummaryProps {
    total: number;
    onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout }) => {
    return (
        <div className="cart-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-row">
                <span>Subtotal:</span>
                <span>${Number(total).toLocaleString('es-CL')}</span>
            </div>
            <div className="summary-row total">
                <span>Total:</span>
                <span>${Number(total).toLocaleString('es-CL')}</span>
            </div>
            <Button onClick={onCheckout} className="checkout-btn">
                Finalizar Compra
            </Button>
        </div>
    );
};

export default CartSummary;
