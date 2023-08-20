import React from "react";

import moviesApi from "../../utils/MoviesApi";

function MoviesCardList ({ movies, parentComponent, onMovieSave, onMovieDelete, savedMovies }) {
    const handleLikeClick = (movie) => {
    const isSavedInLocalStorage = localStorage.getItem(`movie_${movie.id}`) === 'true';
    const isSaved = (savedMovies && savedMovies.some(item => item.movieId === movie.id)) || isSavedInLocalStorage;
    
    const newState = !isSaved;
    localStorage.setItem(`movie_${movie.id}`, newState.toString());

    onMovieSave(movie);
    }

    const handleDeleteClick = (movie) => {
        localStorage.setItem(`movie_${movie.movieId}`, 'false');
        console.log(movie);
        onMovieDelete(movie);
    }

    const timeFormat = (time) => {
        const minutes = time % 60;
        const hour = Math.floor(time / 60);
        return hour ? `${hour}ч ${minutes}м` : `${minutes}м`;
    }

    return (
        <ul className="movies-cardlist">
            {movies.map((movie) => {
                const isMovieSaved = (savedMovies && savedMovies.some(item => item.movieId === movie.id)) || (localStorage.getItem(`movie_${movie.id}`) === 'true');
                return (
                    <li className="movies-card" key={`${movie.id}_${movie.nameRU}`}>
                        <img 
                            src={movie.image.url ? moviesApi._url + movie.image.url : movie.image}
                            className="movies-card__pic"
                            alt={movie.nameRU}
                        />
                        <div className="movies-card__container">
                            <h3 className="movies-card__title">{movie.nameRU}</h3>
                                {parentComponent === "Movies" ? (
                                        <label className="movies-card__radio">
                                            <input
                                                type="checkbox"
                                                className="movies-card__input"
                                                checked={isMovieSaved}
                                                onChange={() => handleLikeClick(movie)}
                                                autoComplete="off"
                                            />
                                            <span className="movies-card__circle" />
                                        </label>
                                ) : (
                                    <button className="movies-card__button-delete" onClick={() => handleDeleteClick(movie)}></button>
                                )}
                        </div>
                        <p className="movies-card__duration">{timeFormat(movie.duration)}</p>
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default React.memo(MoviesCardList);