import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function Movies ({ movies, onGetMovies }) {
    const [isLoading, setIsloading] = useState(false);

    return (
        <main className="movies">
            <SearchForm onGetMovies={onGetMovies} />
            <MoviesCard moviesData={movies} parentComponent="Movies" />
            {isLoading && <Preloader />}
        </main>
    )
}

export default Movies;