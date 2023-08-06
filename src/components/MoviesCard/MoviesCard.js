import React, { useState, useEffect } from "react";
import { movies } from "../../utils/data";

function MoviesCard () {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let itemsToShow;

    if (windowDimensions < 920) {
        itemsToShow = 8;
    } else {
        itemsToShow = 16;
    }

    return (
        <section className="movies-card">
            <div className="movies-card__container_items">
                {movies.slice(0, itemsToShow).map((movie) => (
                    <div className="movies-card__container_item" key={movie.id}>
                        <img 
                            src={movie.pic}
                            className="movies-card__pic"
                            alt="Изображение фильма"
                        />
                        <div className="movies-card__container_radio">
                            <h3 className="movies-card__title">{movie.title}</h3>
                            <label className="movies-card_radio">
                                <input type="radio" className="movies-card_radio_input"/>
                                <div className="movies-card_radio_circle" />
                            </label>
                        </div>
                        <p className="movies-card__time">{movie.time}</p>
                    </div>
                ))}
            </div>
            <button type="button" className="movies-card_button">Ещё</button>
        </section>
    )
}

export default MoviesCard;