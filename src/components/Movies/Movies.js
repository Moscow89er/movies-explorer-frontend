import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function Movies ({ 
    movies,
    isLoading,
    hasSearched,
    hasError,
    onLoadMore,
    cardsToShow,
    isShortChecked,
    setIsShortChecked,
    inputValue,
    setInputValue,
    onClose,
    setSearchKeyword
}) {return (
        <main className="movies">
            <SearchForm
                isShortChecked={isShortChecked}
                setIsShortChecked={setIsShortChecked}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSearchKeyword={setSearchKeyword}
            />
            {isLoading && <Preloader />}
            {hasSearched && !isLoading && !hasError && movies.length > 0 && 
            <MoviesCard
                moviesData={movies}
                parentComponent="Movies"
                onLoadMore={onLoadMore}
                cardsToShow={cardsToShow}
            />}
            {movies && movies.length === 0 && 
            <div className="movies__popup">
                <p className="movies__error-nothing">Ничего не найдено.</p>
            </div>
            }
            {hasSearched && !isLoading && hasError && movies.length > 0 &&
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