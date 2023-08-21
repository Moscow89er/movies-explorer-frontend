import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";
import { movies } from "../../utils/data";

function Movies () {
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsloading(true), 2000);

        setTimeout(() => setIsloading(false), 5000);
    }, [])

    return (
        <main className="movies">
            <SearchForm />
            <MoviesCard moviesData={movies} parentComponent="Movies" />
            {isLoading && <Preloader />}
        </main>
    )
}

export default Movies;