import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesContainer/MoviesContainer";

function SavedMovies ({ 
    movies,
    isLoading,
    inputValue,
    setInputValue,
    setIsShortChecked,
    isShortChecked,
    setSearchKeyword
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
            <MoviesCard moviesData={movies} />
            {isLoading && <Preloader />}
        </main>
    )
}

export default SavedMovies;