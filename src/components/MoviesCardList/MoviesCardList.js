import React from "react";
import moviesApi from "../../utils/MoviesApi";

function MoviesCardList ({ movies, parentComponent, onMovieSave }) {
    const handleLikeClick = (movie) => {
        onMovieSave(movie);
    }

    return (
        <ul className="movies-cardlist">
            {movies.map((movie) => {
                return (
                    <li className="movies-card" key={movie.id ?? movie.movieId}>
                        <img 
                            src={movie.image.url ? moviesApi._url + movie.image.url : movie.image}
                            className="movies-card__pic"
                            alt={movie.nameRU}
                        />
                        <div className="movies-card__container">
                            <h3 className="movies-card__title">{movie.nameRU}</h3>
                                {parentComponent === "Movies" ? (
                                        <label className="movies-card__radio">
                                            <input type="radio" className="movies-card__input" onChange={() => handleLikeClick(movie)} />
                                            <span className="movies-card__circle" />
                                        </label>
                                ) : (
                                    <button className="movies-card__button-delete"></button>
                                )}
                        </div>
                        <p className="movies-card__duration">{movie.duration}</p>
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default React.memo(MoviesCardList);