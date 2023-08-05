import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies () {
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsloading(true), 2000);

        setTimeout(() => setIsloading(false), 5000);
    }, [])

    return (
        <section className="movies">
            <SearchForm />
            <MoviesCard />
            {isLoading && <Preloader />}
        </section>
    )
}

export default Movies;