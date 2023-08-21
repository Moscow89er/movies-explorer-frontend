import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies ({ 
    movies,
    isLoading,
    hasSearched,
    hasError,
    inputValue,
    setInputValue,
    setIsShortChecked,
    isShortChecked,
    setSearchKeyword,
    onMovieDelete,
    savedMovies
}) {
    return (
        <main className="saved-movies">
            <SearchForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                setIsShortChecked={setIsShortChecked}
                isShortChecked={isShortChecked}
                setSearchKeyword={setSearchKeyword}
            />
            <MoviesCardList
                moviesData={movies}
                parentComponent="SavedMovies"
                onMovieDelete={onMovieDelete}
                savedMovies={savedMovies} 
            />
            {isLoading && <Preloader />}
            {movies && movies.length === 0 && 
            <div className="movies__popup">
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

export default React.memo(SavedMovies);