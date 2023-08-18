import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function Movies ({ 
    movies,
    getMovies,
    isLoading,
    hasSearched,
    hasError,
    onLoadMore,
    cardsToShow,
    isShortChecked,
    setIsShortChecked,
    inputValue,
    setInputValue
}) {return (
        <main className="movies">
            <SearchForm 
                getMovies={getMovies}
                isShortChecked={isShortChecked}
                setIsShortChecked={setIsShortChecked}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
            {isLoading && <Preloader />}
            {hasSearched && !isLoading && !hasError && movies.length > 0 && 
            <MoviesCard 
                moviesData={movies}
                parentComponent="Movies"
                onLoadMore={onLoadMore}
                cardsToShow={cardsToShow}
            />}
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