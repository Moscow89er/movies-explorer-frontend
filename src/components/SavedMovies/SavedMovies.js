import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function SavedMovies ({ movies }) {
    const [isLoading, setIsloading] = useState(false);

    return (
        <main className="saved-movies">
            <SearchForm />
            <MoviesCard moviesData={movies} />
            {isLoading && <Preloader />}
        </main>
    )
}

export default SavedMovies;