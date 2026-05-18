/**
 * HeroSection component
 */

import React from 'react';
import './HeroSection.css';
import Button from '../Button/Button';

interface HeroSectionProps {
    onExploreClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Bienvenido a LevelUp</h1>
                <p>Tu destino para todo lo relacionado con el gaming.</p>
                <Button onClick={onExploreClick} className="hero-button">
                    Explorar Productos
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;
