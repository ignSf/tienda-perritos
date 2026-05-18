/**
 * Anime Blog page
 */

import React from 'react';
import './AnimeBlog.css';
import animeCard from '../../assets/anime-card.png';

const AnimeBlog: React.FC = () => {
    return (
        <div className="anime-blog-page">
            <div className="blog-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${animeCard})` }}>
                <h1>Anime & Manga Hub</h1>
                <p>Tu dosis diaria de cultura otaku</p>
            </div>

            <div className="blog-container">
                <article className="blog-post">
                    <span className="post-date">26 Nov 2025</span>
                    <h2>Los estrenos más esperados de la temporada</h2>
                    <p>
                        La temporada de invierno viene cargada de secuelas increíbles y nuevas adaptaciones que prometen
                        convertirse en clásicos instantáneos. Desde el regreso de los titanes del shonen hasta joyas
                        ocultas del slice of life, analizamos todo lo que no te puedes perder.
                    </p>
                    <div className="post-tags">
                        <span>#Estrenos</span>
                        <span>#Invierno2025</span>
                        <span>#Recomendaciones</span>
                    </div>
                </article>

                <article className="blog-post">
                    <span className="post-date">24 Nov 2025</span>
                    <h2>Top 10 Openings del año</h2>
                    <p>
                        La música es parte fundamental de la experiencia anime. Hemos recopilado los temas más pegadizos,
                        emotivos y visualmente impactantes de este año. ¿Está tu favorito en la lista?
                    </p>
                    <div className="post-tags">
                        <span>#Música</span>
                        <span>#JPop</span>
                        <span>#Top10</span>
                    </div>
                </article>

                <article className="blog-post">
                    <span className="post-date">20 Nov 2025</span>
                    <h2>Reseña: "Cyber-Samurai Chronicles"</h2>
                    <p>
                        Una mezcla audaz de estética feudal y tecnología futurista. Esta nueva serie original de Netflix
                        ha dado mucho de qué hablar por su estilo de animación único y su narrativa compleja.
                    </p>
                    <div className="post-tags">
                        <span>#Reseña</span>
                        <span>#SciFi</span>
                        <span>#Samurai</span>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default AnimeBlog;
