/**
 * Header component
 */

import React from 'react';
import './Header.css';
import type { Page } from '../../types';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
    const { cartItems } = useCart();
    const { user, logout } = useUser();
    const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

    return (
        <header className="app-header">
            <div className="container header-container">
                <div className="logo" onClick={() => setCurrentPage('home')}>
                    LEVELUP
                </div>
                <nav className="main-nav">
                    <a href="#" onClick={() => setCurrentPage('home')}>Inicio</a>
                    <a href="#" onClick={() => setCurrentPage('products')}>Productos</a>
                    <a href="#" onClick={() => setCurrentPage('community')}>Comunidad</a>
                    <a href="#" onClick={() => setCurrentPage('tech-support')}>Soporte</a>
                </nav>
                <div className="header-actions">
                    {user ? (
                        <div className="user-info">
                            <span onClick={() => setCurrentPage('profile')} style={{ cursor: 'pointer' }}>
                                Hola, {user.nombre_usuario}
                            </span>
                            <Button variant="secondary" onClick={logout} className="logout-btn">Salir</Button>
                        </div>
                    ) : (
                        <>
                            <a href="#" onClick={() => setCurrentPage('login')}>Iniciar Sesión</a>
                            <a href="#" onClick={() => setCurrentPage('register')}>Registro</a>
                        </>
                    )}
                    <a href="#" onClick={() => setCurrentPage('cart')} className="cart-button">
                        Carrito ({totalItems})
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
