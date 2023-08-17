import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function Movies ({ 
    movies,
    onGetMovies,
    isLoading,
    hasSearched,
    hasError,
    onLoadMore,
    cardsToShow,
    onClose,
    isOpen,
    onKeyword,
    onShortMoviesChecked,
    onFilter
}) {return (
        <main className="movies">
            <SearchForm 
                onGetMovies={onGetMovies}
                onKeyword={onKeyword}
                onShortMoviesChecked={onShortMoviesChecked}
            />
            {isLoading && <Preloader />}
            {hasSearched && !isLoading && !hasError && movies.length > 0 && 
            <MoviesCard 
                moviesData={movies}
                parentComponent="Movies"
                onLoadMore={onLoadMore}
                cardsToShow={cardsToShow}
            />}
            {isOpen &&
            <div className="movies__popup">
                <button className="movies__close-button" onClick={onClose}/>
                <p className="movies__error-nothing">Ничего не найдено.</p>
            </div>
            }
            {hasSearched && !isLoading && hasError && movies.length &&
            <p className="movies__error">
                Во время запроса произошла ошибка. Возможно,
                проблема с соединением или сервер недоступен.
                Подождите немного и попробуйте ещё раз.
            </p>
            } 
        </main>
    )
}

export default Movies;