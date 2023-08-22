import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    onMovieDelete
}) {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/saved-movies") {
            setInputValue("");
            setIsShortChecked(false);
            setSearchKeyword("");
        }
    }, [location.pathname, setInputValue, setIsShortChecked, setSearchKeyword]);

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