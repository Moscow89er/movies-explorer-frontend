import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function MoviesContainer ({ moviesData, parentComponent, onLoadMore, cardsToShow }) {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
    const [movies, setMovies] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(16);

    let resizeTimeout;

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setWindowDimensions(window.innerWidth);
            resetItemsToShow();
        }, 100)
    }

    function resetItemsToShow() {
        if (windowDimensions > 768) {
            setItemsToShow(prev => Math.max(prev, 16));
        } else if (windowDimensions > 480) {
            setItemsToShow(prev => Math.max(prev, 8));
        } else {
            setItemsToShow(prev => Math.max(prev, 5));
        }
    }

    function handleLoadMore() {
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
    }, [])

    useEffect(() => {
        if (moviesData) {
            setMovies(moviesData);
        } 
    }, [moviesData])

    useEffect(() => {
        resetItemsToShow();
    }, [])
    
    return (
        <section className="movies-container">
                <MoviesCardList movies={movies ? movies.slice(0, itemsToShow) : []} parentComponent={parentComponent} />
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