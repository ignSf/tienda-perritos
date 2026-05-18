/**
 * ProductCard component
 */

import React from 'react';
import './ProductCard.css';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../Button/Button';

interface ProductCardProps {
    product: Product;
    isAdmin?: boolean;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onEdit, onDelete }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product.idproducto) {
            addToCart(product.idproducto, 1);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.imagen_url || '/assets/gpu.png'}
                    alt={product.nombreproducto}
                    className="product-image"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/gpu.png'; // Fallback
                    }}
                />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.nombreproducto}</h3>
                <p className="product-category">{product.categoria || 'General'}</p>
                <p className="product-price">${Number(product.precioproducto).toLocaleString('es-CL')}</p>
            </div>
            <div className="product-actions">
                <Button onClick={handleAddToCart} variant="primary" className="add-to-cart-btn">
                    Agregar
                </Button>
                {isAdmin && (
                    <div className="admin-actions">
                        <Button onClick={() => onEdit?.(product)} variant="secondary" className="edit-btn">
                            Editar
                        </Button>
                        <Button onClick={() => product.idproducto && onDelete?.(product.idproducto)} variant="danger" className="delete-btn">
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
