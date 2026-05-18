/**
 * QuantityControl component
 */

import React from 'react';
import './QuantityControl.css';

interface QuantityControlProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrement, onDecrement }) => {
    return (
        <div className="quantity-controls">
            <button onClick={onDecrement} className="qty-btn">-</button>
            <span className="qty-display">{quantity}</span>
            <button onClick={onIncrement} className="qty-btn">+</button>
        </div>
    );
};

export default QuantityControl;
