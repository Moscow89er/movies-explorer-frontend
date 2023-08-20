import MoviesContainer from "../MoviesContainer/MoviesContainer";

function MoviesCard ({ moviesData, parentComponent, onMovieSave, onMovieDelete, savedMovies }) {
    return (
        <MoviesContainer
            moviesData={moviesData}
            parentComponent={parentComponent}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            savedMovies={savedMovies}
        />
    )
}

export default MoviesCard;