/**
 * Products page
 */

import React, { useState, useEffect } from 'react';
import './Products.css';
import Button from '../../components/Button/Button';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useUser } from '../../context/UserContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilters from '../../components/ProductFilters/ProductFilters';
import SearchBar from '../../components/SearchBar/SearchBar';
import { productService } from '../../api/productService';
import type { Product } from '../../types';

const Products: React.FC = () => {
    const { user } = useUser();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
    const [formLoading, setFormLoading] = useState(false);

    const isAdmin = user?.rol?.toUpperCase() === 'ADMIN' || user?.rol?.toUpperCase() === 'ROLE_ADMIN';

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
            setFilteredProducts(data);

            const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.categoria).filter(Boolean)));
            setCategories(uniqueCategories as string[]);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.categoria === category));
        }
    };

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setFilteredProducts(products);
            return;
        }

        try {
            const results = await productService.searchProducts(query);
            setFilteredProducts(results);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleCreate = () => {
        setEditingProduct(undefined);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!user) return;
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            await productService.deleteProduct(id);
            await loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleFormSubmit = async (productData: Product) => {
        if (!user) return;
        setFormLoading(true);
        try {
            if (editingProduct?.idproducto) {
                const updatedProduct = { ...productData, idproducto: editingProduct.idproducto };
                await productService.updateProduct(updatedProduct);
            } else {
                await productService.createProduct(productData);
            }
            await loadProducts();
            setShowForm(false);
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error al guardar el producto');
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Catálogo de Productos</h1>
                {isAdmin && (
                    <Button onClick={handleCreate}>Nuevo Producto</Button>
                )}
            </div>

            <SearchBar onSearch={handleSearch} />
            <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {loading ? (
                <p className="loading">Cargando productos...</p>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.idproducto}
                            product={product}
                            isAdmin={isAdmin}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    isLoading={formLoading}
                />
            )}
        </div>
    );
};

export default Products;
