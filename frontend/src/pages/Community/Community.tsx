/**
 * Community page
 */

import React from 'react';
import './Community.css';
import animeCard from '../../assets/anime-card.png';
import esportsCard from '../../assets/esports-card.png';
import type { Page } from '../../types';

interface CommunityProps {
    onNavigate: (page: Page) => void;
}

const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
    return (
        <div className="community-page">
            <h1 className="community-title">Comunidad</h1>
            <p className="community-subtitle">Explora nuestros blogs y únete a la conversación</p>

            <div className="community-cards">
                <div className="community-card anime-card" onClick={() => onNavigate('anime-blog')}>
                    <div className="card-image" style={{ backgroundImage: `url(${animeCard})` }}></div>
                    <div className="card-content">
                        <h2>Anime & Manga</h2>
                        <p>Descubre las últimas novedades, reseñas y discusiones sobre tus series favoritas.</p>
                        <span className="card-link">Leer más &rarr;</span>
                    </div>
                </div>

                <div className="community-card esports-card" onClick={() => onNavigate('esports-blog')}>
                    <div className="card-image" style={{ backgroundImage: `url(${esportsCard})` }}></div>
                    <div className="card-content">
                        <h2>E-Sports</h2>
                        <p>Mantente al día con los torneos, equipos y jugadas más épicas del mundo gaming.</p>
                        <span className="card-link">Leer más &rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
