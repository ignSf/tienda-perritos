/**
 * FeaturesSection component
 */

import React from 'react';
import './FeaturesSection.css';
import FeatureCard from '../FeatureCard/FeatureCard';

const FeaturesSection: React.FC = () => {
    const features = [
        {
            title: 'Productos de Calidad',
            description: 'Equipamiento y accesorios de las mejores marcas.',
        },
        {
            title: 'Comunidad Gamer',
            description: 'Únete a eventos, noticias y más.',
        },
        {
            title: 'Soporte Técnico',
            description: 'Expertos listos para ayudarte a optimizar tu juego.',
        },
    ];

    return (
        <section className="features-section">
            <h2>¿Por qué elegirnos?</h2>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <FeatureCard key={index} title={feature.title} description={feature.description} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
