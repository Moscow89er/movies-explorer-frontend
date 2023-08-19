import MoviesContainer from "../MoviesContainer/MoviesContainer";

function MoviesCard ({ moviesData, parentComponent, onMovieSave, onMovieDelete }) {
    return (
        <MoviesContainer moviesData={moviesData} parentComponent={parentComponent} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} />
    )
}

export default MoviesCard;