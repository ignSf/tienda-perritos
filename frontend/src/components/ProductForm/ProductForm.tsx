/**
 * ProductForm component for creating and editing products
 */

import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import type { Product } from '../../types';

interface ProductFormProps {
    product?: Product;
    onSubmit: (product: Product) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState<Product>({
        nombreproducto: '',
        precioproducto: 0,
        categoria: '',
        imagen_url: ''
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precioproducto' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div className="product-form-overlay">
            <div className="product-form-container">
                <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nombre del Producto"
                        type="text"
                        name="nombreproducto"
                        value={formData.nombreproducto}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Precio"
                        type="number"
                        name="precioproducto"
                        value={formData.precioproducto}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    <Input
                        label="Categoría"
                        type="text"
                        name="categoria"
                        value={formData.categoria || ''}
                        onChange={handleChange}
                        placeholder="Ej: Periféricos, Componentes, etc."
                    />
                    <Input
                        label="URL de Imagen (Opcional)"
                        type="text"
                        name="imagen_url"
                        value={formData.imagen_url || ''}
                        onChange={handleChange}
                        placeholder="/assets/gpu.png o URL externa"
                    />
                    <div className="form-actions">
                        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
