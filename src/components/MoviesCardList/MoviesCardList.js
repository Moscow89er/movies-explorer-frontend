import React from "react";

function MoviesCardList ({ movies, parentComponent }) {
    return (
        <ul className="movies-cardlist">
            {movies.map((movie) => {
                const imageUrl = `https://api.nomoreparties.co${movie.image}`;

                return (
                    <li className="movies-card" key={movie.movieId}>
                        <img 
                            src={imageUrl}
                            className="movies-card__pic"
                            alt={movie.nameRU}
                        />
                        <div className="movies-card__container">
                            <h3 className="movies-card__title">{movie.nameRU}</h3>
                                {parentComponent === "Movies" ? (
                                        <label className="movies-card__radio">
                                            <input type="radio" className="movies-card__input"/>
                                            <span className="movies-card__circle" />
                                        </label>
                                ) : (
                                    <button className="movies-card__button-delete"></button>
                                )}
                        </div>
                        <p className="movies-card__duration">{movie.duration}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default MoviesCardList;