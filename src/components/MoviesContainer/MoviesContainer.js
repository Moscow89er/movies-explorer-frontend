import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function MoviesContainer ({ moviesData, parentComponent }) {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (moviesData) {
            setMovies(moviesData);
        } 
    }, [moviesData])

    let itemsToShow = 16;

    if (windowDimensions < 920) {
        itemsToShow = 8;
    }
    
    if (windowDimensions < 620) {
        itemsToShow = 5;
    }

    if (windowDimensions < 620 && parentComponent !== "Movies") {
        itemsToShow = 2;
    }

    return (
        <section className="movies-container">
            <div className="movies-container__items">
                <MoviesCardList movies={movies ? movies.slice(0, itemsToShow) : []} parentComponent={parentComponent} />
            </div>
                <button 
                    style={parentComponent === "Movies" ? {} : {visibility: "hidden", margin: "50px auto 54px"}}
                    type="button"
                    className="movies-container__button"
                    >
                        Ещё
                    </button>
        </section>
    )
}

export default MoviesContainer;