import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function MoviesContainer ({ moviesData, parentComponent, onMovieSave, onMovieDelete, savedMovies }) {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
    const [movies, setMovies] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(16);

    const handleResize = debounce(() => {
        setWindowDimensions(window.innerWidth);
    }, 200)

    const resetItemsToShow = useCallback(() => {
        let initialCount;
        if (windowDimensions > 780) {
            initialCount = 16;
        } else if (windowDimensions > 480) {
            initialCount = 8;
        } else {
            initialCount = 5;
        }
        setItemsToShow(prev => Math.min(Math.max(prev, initialCount), movies.length));
    }, [movies.length, windowDimensions])

    const handleLoadMore = () => {
        if (windowDimensions > 768) {
            setItemsToShow(itemsToShow + 4);
        } else if (windowDimensions > 480) {
            setItemsToShow(itemsToShow + 4);
        } else {
            setItemsToShow(itemsToShow + 2);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize])

    useEffect(() => {
        if (moviesData) {
            setMovies(moviesData);
        } 
    }, [moviesData])

    useEffect(() => {
        resetItemsToShow();
    }, [movies, resetItemsToShow, windowDimensions])
    
    return (
        <section className="movies-container">
                <MoviesCardList
                    movies={movies ? movies.slice(0, itemsToShow) : []}
                    parentComponent={parentComponent}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                    savedMovies={savedMovies}
                />
                {(movies.length > itemsToShow && parentComponent === 'Movies') ? (
                    <button 
                        style={parentComponent === "Movies" ? {} : {visibility: "hidden", margin: "50px auto 54px"}}
                        type="button"
                        className="movies-container__button"
                        onClick={handleLoadMore}
                    >
                        Ещё
                    </button>
                ) : null}  
        </section>
    )
}

export default MoviesContainer;