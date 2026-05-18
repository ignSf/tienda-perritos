/**
 * CartItemsList component
 */

import React from 'react';
import './CartItemsList.css';
import CartItem from '../CartItem/CartItem';
import type { Cart } from '../../types';

interface CartItemsListProps {
    items: Cart[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ items, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-items-list">
            {items.map((item) => (
                <CartItem
                    key={item.idcarrito}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default CartItemsList;
