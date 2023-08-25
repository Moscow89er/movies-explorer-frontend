import React from "react";
import moviesApi from "../../utils/MoviesApi";

function MoviesCard ({ movie, parentComponent, onMovieSave, onMovieDelete, savedMovies }) {
    const isMovieSaved = savedMovies ? savedMovies.some((item) => item.movieId === movie.id) : false;
    const handleLikeClick = () => {
        onMovieSave(movie);
    }

    const handleDeleteClick = () => {
        onMovieDelete(movie);
    }

    const timeFormat = (time) => {
        const minutes = time % 60;
        const hour = Math.floor(time / 60);
        return hour ? `${hour}ч ${minutes}м` : `${minutes}м`;
    }

    return (
        <li className="movies-card">
            <a
                className="movies-card__link"
                href={movie.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img 
                    src={movie.image.url ? moviesApi._url + movie.image.url : movie.image}
                    className="movies-card__pic"
                    alt={movie.nameRU}
                />
            </a> 
            <div className="movies-card__container">
                <h3 className="movies-card__title">{movie.nameRU}</h3>
                    {parentComponent === "Movies" ? (
                    <button
                        className={
                            isMovieSaved
                                ? 'movies-card__button-like_active'
                                : 'movies-card__button-like'
                        }
                        onClick={handleLikeClick}
                        type='button'
                    ></button>
                    ) : (
                        <button className="movies-card__button-delete" onClick={handleDeleteClick}></button>
                    )}
            </div>
            <p className="movies-card__duration">{timeFormat(movie.duration)}</p>
        </li>
    )
}

export default React.memo(MoviesCard);