/**
 * TechSupport page
 */

import React from 'react';
import './TechSupport.css';

const TechSupport: React.FC = () => {
    return (
        <div className="tech-support-page">
            <h1>Soporte Técnico</h1>
            <section className="support-section">
                <h2>¿Necesitas Ayuda?</h2>
                <p>Nuestro equipo de expertos está listo para ayudarte con cualquier consulta técnica.</p>
            </section>
            <section className="support-section">
                <h2>Optimización de Juegos</h2>
                <p>Obtén asesoría personalizada para mejorar el rendimiento de tus juegos y equipos.</p>
            </section>
            <section className="support-section">
                <h2>Contacto</h2>
                <p>Email: soporte@levelup.com</p>
                <p>Teléfono: +56 9 1234 5678</p>
            </section>
        </div>
    );
};

export default TechSupport;
