import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function Movies ({ movies, onGetMovies, isLoading, hasSearched, hasError, onLoadMore, cardsToShow }) {
    return (
        <main className="movies">
            <SearchForm onGetMovies={onGetMovies} />
            {isLoading && <Preloader />}
            {hasSearched && !isLoading && !hasError && movies.length > 0
            && <MoviesCard 
                moviesData={movies}
                parentComponent="Movies"
                onLoadMore={onLoadMore}
                cardsToShow={cardsToShow}
            />}
            {hasSearched && !isLoading && !hasError && movies.length === 0 
            && <p className="movies__error">Ничего не найдено.</p>}
            {hasSearched && !isLoading && hasError && movies.length
            && <p className="movies__error">
                    Во время запроса произошла ошибка. Возможно,
                    проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз.
                </p>
            } 
        </main>
    )
}

export default Movies;