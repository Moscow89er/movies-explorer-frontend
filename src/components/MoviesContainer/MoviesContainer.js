import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function MoviesContainer ({ moviesData, parentComponent, onLoadMore, cardsToShow }) {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
    const [movies, setMovies] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(16);

    let resizeTimeout;

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => setWindowDimensions(window.innerWidth), 100);
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
        let count = cardsToShow;
        if (windowDimensions < 920) count = 8;
        if (windowDimensions < 620) count = 5;
        if (windowDimensions < 620 && parentComponent !== "Movies") count = 2;

        setItemsToShow(count);
    }, [windowDimensions, parentComponent, cardsToShow])
    
    return (
        <section className="movies-container">
                <MoviesCardList movies={movies ? movies.slice(0, itemsToShow) : []} parentComponent={parentComponent} />
                {(movies.length > itemsToShow && parentComponent === 'Movies') ? (
                    <button 
                        style={parentComponent === "Movies" ? {} : {visibility: "hidden", margin: "50px auto 54px"}}
                        type="button"
                        className="movies-container__button"
                        onClick={onLoadMore}
                    >
                        Ещё
                    </button>
                ) : null}  
        </section>
    )
}

export default MoviesContainer;