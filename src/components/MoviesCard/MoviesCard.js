import MoviesContainer from "../MoviesContainer/MoviesContainer";

function MoviesCard ({ moviesData, parentComponent, onMovieSave }) {
    return (
        <MoviesContainer moviesData={moviesData} parentComponent={parentComponent} onMovieSave={onMovieSave} />
    )
}

export default MoviesCard;