import React from "react";

function MoviesCardList ({ movies, parentComponent }) {
    return (
        movies.map((movie) => (
            <div className="movies-card" key={movie.id}>
                <img 
                    src={movie.pic}
                    className="movies-card__pic"
                    alt="Изображение фильма"
                />
                <div className="movies-card__container">
                    <h3 className="movies-card__title">{movie.title}</h3>
                        {parentComponent === "Movies" ? (
                                <label className="movies-card__radio">
                                    <input type="radio" className="movies-card__input"/>
                                    <span className="movies-card__circle" />
                                </label>
                        ) : (
                            <button className="movies-card__button-delete"></button>
                        )}
                </div>
                <p className="movies-card__duration">{movie.time}</p>
            </div>
        ))
    )
}

export default MoviesCardList;