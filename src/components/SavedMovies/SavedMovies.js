import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";
import { savedMovies } from "../../utils/data";

function SavedMovies () {
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsloading(true), 2000);

        setTimeout(() => setIsloading(false), 5000);
    }, [])

    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCard moviesData={savedMovies} />
            {isLoading && <Preloader />}
        </section>
    )
}

export default SavedMovies;