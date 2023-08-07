
import MoviesContainer from "../MoviesContainer/MoviesContainer";

function MoviesCard ({ moviesData, parentComponent }) {
    return (
        <MoviesContainer moviesData={moviesData} parentComponent={parentComponent} />
    )
}

export default MoviesCard;