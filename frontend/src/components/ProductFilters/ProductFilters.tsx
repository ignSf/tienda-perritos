/**
 * ProductFilters component
 */

import React from 'react';
import './ProductFilters.css';
import Button from '../Button/Button';

interface ProductFiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="filters">
            <Button
                onClick={() => onCategoryChange('all')}
                variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                className="filter-btn"
            >
                Todos
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    variant={selectedCategory === category ? 'primary' : 'secondary'}
                    className="filter-btn"
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};

export default ProductFilters;
