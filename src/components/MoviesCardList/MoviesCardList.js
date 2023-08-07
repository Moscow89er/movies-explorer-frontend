import React from "react";

function MoviesCardList ({ movies, parentComponent }) {
    return (
        movies.map((movie) => (
            <div className="movies-cardlist__item" key={movie.id}>
                <img 
                    src={movie.pic}
                    className="movies-cardlist__pic"
                    alt="Изображение фильма"
                />
                <div className="movies-cardlist__container_radio">
                    <h3 className="movies-cardlist__title">{movie.title}</h3>
                        {parentComponent === "Movies" ? (
                                <label className="movies-cardlist__radio">
                                    <input type="radio" className="movies-cardlist__radio_input"/>
                                    <div className="movies-cardlist__radio_circle" />
                                </label>
                        ) : (
                            <button className="movies-cardlist__button_delete"></button>
                        )}
                </div>
                <p className="movies-cardlist__time">{movie.time}</p>
            </div>
        ))
    )
}

export default MoviesCardList;