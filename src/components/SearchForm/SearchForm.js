import React, { useState } from "react";
import useFormValidator from "../../utils/useFormValidator";

function SearchForm ({ getMovies, isShortChecked, setIsShortChecked, setInputValue, inputValue }) {
    const [searchError, setSearchError] = useState("");
    const {
        formValues,
        isValid,
        handleInputChange
    } = useFormValidator({ search: "" });

    function filterMovies(evt) {
        evt.preventDefault();
        if (!isValid || !formValues.search) {
            setSearchError("Нужно ввести ключевое слово");
        } else {
            setSearchError("");
            setInputValue(formValues.search);
            getMovies(formValues.search);
        }
    }

    function handleCheckboxChange() {
        setIsShortChecked(!isShortChecked);
    }

    return (
        <div className="search">
            <form className="search__form"  onSubmit={filterMovies} noValidate>
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
                    <input type="checkbox" className="search__input-checkbox" checked={isShortChecked} onChange={handleCheckboxChange} />
                    <span className="search__text-checkbox">Короткометражки</span>
                </label>
            </div>
        </div>
    )
}

export default SearchForm;