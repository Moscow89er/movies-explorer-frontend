import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies ({ 
    movies,
    isLoading,
    hasError,
    isShortChecked,
    setIsShortChecked,
    inputValue,
    setInputValue,
    setSearchKeyword,
    onMovieSave,
    savedMovies
}) {
    return (
        <main className="movies">
            <SearchForm
                isShortChecked={isShortChecked}
                setIsShortChecked={setIsShortChecked}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSearchKeyword={setSearchKeyword}
            />
            {isLoading && <Preloader />}
            {!isLoading && !hasError && movies?.length > 0 && 
            <MoviesCardList
                moviesData={movies}
                parentComponent="Movies"
                onMovieSave={onMovieSave}
                savedMovies={savedMovies}
            />}
            {movies && movies?.length === 0 && 
            <div className="movies__popup">
                <p className="movies__error-nothing">Ничего не найдено.</p>
            </div>
            }
            {!isLoading && hasError && movies?.length &&
            <p className="movies__error">
                Во время запроса произошла ошибка. Возможно,
                проблема с соединением или сервер недоступен.
                Подождите немного и попробуйте ещё раз.
            </p>
            }
        </main>
    )
}

export default React.memo(Movies);