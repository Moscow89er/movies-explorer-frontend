import React, { useState } from "react";

function SearchForm ({ isShortChecked, setIsShortChecked, setInputValue, inputValue, setSearchKeyword }) {
    const [searchError, setSearchError] = useState("");

    const handleSearchInput = (evt) => {
        setInputValue(evt.target.value);
    }

    function handleCheckboxChange() {
        setIsShortChecked(!isShortChecked);
    }

    const handleSearchButtonClick = (input) => setSearchKeyword(input);

    const handleSearch = (evt) => {
        evt.preventDefault();
        if (!inputValue) {
            setSearchError("Нужно ввести ключевое слово");
        } else {
            setSearchError("");
            handleSearchButtonClick(inputValue);
        }
    }

    return (
        <div className="search">
            <form className="search__form"  onSubmit={handleSearch} noValidate>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    placeholder="Фильм"
                    onChange={handleSearchInput}
                    value={inputValue || ""}
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

export default React.memo(SearchForm);