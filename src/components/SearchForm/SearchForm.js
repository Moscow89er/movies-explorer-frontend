import React, { useState } from "react";
import useFormValidator from "../../utils/useFormValidator";

function SearchForm ({ onGetMovies, onKeyword, onShortMoviesChecked }) {
    const [searchError, setSearchError] = useState("");
    const {
        formValues,
        isValid,
        handleInputChange
    } = useFormValidator({ search: "" });

    function getMovies(evt) {
        evt.preventDefault();
        if (!isValid || !formValues.search) {
            setSearchError("Нужно ввести ключевое слово");
        } else {
            setSearchError("");
            onKeyword(formValues.search);
            onGetMovies();
        }
    }

    function handleCheckboxChange(evt) {
        onShortMoviesChecked(evt.target.checked);
    }

    return (
        <div className="search">
            <form className="search__form"  onSubmit={getMovies} noValidate>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    placeholder="Фильм"
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="search__button" />
            </form>
            {searchError && <p className="search__error">{searchError}</p>}
            <div className="search__container">
                <label className="search__checkbox">
                    <input type="checkbox" className="search__input-checkbox" onChange={handleCheckboxChange} />
                    <span className="search__text-checkbox">Короткометражки</span>
                </label>
            </div>
        </div>
    )
}

export default SearchForm;