/**
 * Esports Blog page
 */

import React from 'react';
import './EsportsBlog.css';
import esportsCard from '../../assets/esports-card.png';

const EsportsBlog: React.FC = () => {
    return (
        <div className="esports-blog-page">
            <div className="esports-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${esportsCard})` }}>
                <h1>E-Sports Arena</h1>
                <p>Donde nacen las leyendas</p>
            </div>

            <div className="blog-container">
                <article className="esports-post">
                    <div className="post-badge">TORNEOS</div>
                    <h2>Gran Final del Campeonato Mundial 2025</h2>
                    <p>
                        El estadio estaba a reventar. Dos equipos legendarios se enfrentaron en una serie al mejor de cinco
                        que pasará a la historia. Analizamos las estrategias, los picks sorpresa y el momento decisivo
                        que coronó a los nuevos reyes.
                    </p>
                </article>

                <article className="esports-post">
                    <div className="post-badge update">ACTUALIZACIÓN</div>
                    <h2>Notas del Parche 14.2: Cambios en el Meta</h2>
                    <p>
                        Los desarrolladores han escuchado a la comunidad. Nerfeos necesarios a los asesinos y mejoras
                        significativas para los tanques. ¿Cómo afectará esto a tus partidas clasificatorias? Te lo contamos todo.
                    </p>
                </article>

                <article className="esports-post">
                    <div className="post-badge interview">ENTREVISTA</div>
                    <h2>Faker habla sobre su retiro y legado</h2>
                    <p>
                        En una entrevista exclusiva, el "Rey Demonio Inmortal" reflexiona sobre su carrera de más de una década,
                        la evolución de los e-sports y qué le depara el futuro tras colgar el teclado.
                    </p>
                </article>
            </div>
        </div>
    );
};

export default EsportsBlog;
