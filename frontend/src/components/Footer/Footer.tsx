/**
 * Footer component
 */

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="container footer-container">
                <p>&copy; 2025 LevelUp Gaming. Todos los derechos reservados.</p>
                <div className="footer-links">
                    <a href="#">Política de Privacidad</a>
                    <a href="#">Términos de Servicio</a>
                    <a href="#">Contacto</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
