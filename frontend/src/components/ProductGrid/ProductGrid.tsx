/**
 * ProductGrid component
 */

import React from 'react';
import './ProductGrid.css';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    if (products.length === 0) {
        return <p className="no-products">No se encontraron productos.</p>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.idproducto} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
