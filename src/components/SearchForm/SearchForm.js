function SearchForm () {
    return (
        <div className="search">
            <form className="search__form">
                <input type="text" className="search__input" placeholder="Фильм"></input>
                <button type="submit" className="search__button"></button>
            </form>
            <div className="search__container">
                <label className="search__checkbox">
                    <input type="checkbox" className="search__input-checkbox" />
                    <span className="search__text-checkbox">Короткометражки</span>
                </label>
            </div>
        </div>
    )
}

export default SearchForm;