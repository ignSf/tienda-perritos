/**
 * Home page
 */

import React from 'react';
import './Home.css';
import type { Page } from '../../types';

interface HomeProps {
    onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="home-page">
            <div className="home-overlay">
                <div className="hero-section">
                    <h1 className="hero-title">
                        BIENVENIDO A <span className="highlight">LEVELUP</span>
                    </h1>
                    <p className="hero-subtitle">
                        Tu destino definitivo para el mejor hardware y periféricos gaming.
                        Eleva tu nivel de juego con nuestra selección premium.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-button primary" onClick={() => onNavigate('products')}>
                            Ver Productos
                        </button>
                        <button className="cta-button secondary" onClick={() => onNavigate('community')}>
                            Unirse a la Comunidad
                        </button>
                    </div>
                </div>

                <div className="features-section">
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Rendimiento Extremo</h3>
                        <p>Hardware de última generación para los juegos más exigentes.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Garantía Total</h3>
                        <p>Soporte técnico especializado y garantía en todos nuestros productos.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Envío Rápido</h3>
                        <p>Recibe tu setup soñado en tiempo récord, listo para jugar.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
