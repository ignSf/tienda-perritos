/**
 * CartItem component
 */

import React from 'react';
import './CartItem.css';
import type { Cart } from '../../types';
import QuantityControl from '../QuantityControl/QuantityControl';
import Button from '../Button/Button';

interface CartItemProps {
    item: Cart;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    const productName = item.producto.nombreproducto;
    const productPrice = item.producto.precioproducto;

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img
                    src={item.producto.imagen_url || '/assets/gpu.png'}
                    alt={productName}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/gpu.png';
                    }}
                />
            </div>
            <div className="cart-item-details">
                <h3>{productName}</h3>
                <p className="price">${Number(productPrice).toLocaleString('es-CL')}</p>
                <QuantityControl
                    quantity={item.cantidad}
                    onIncrement={() => item.producto.idproducto && onUpdateQuantity(item.producto.idproducto, item.cantidad + 1)}
                    onDecrement={() => item.producto.idproducto && onUpdateQuantity(item.producto.idproducto, item.cantidad - 1)}
                />
            </div>
            <div className="cart-item-actions">
                <Button variant="danger" onClick={() => item.producto.idproducto && onRemove(item.producto.idproducto)} className="remove-item-btn">
                    Eliminar
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
