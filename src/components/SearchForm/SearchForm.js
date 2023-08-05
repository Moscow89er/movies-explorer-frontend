function SearchForm () {
    return (
        <section className="search">
            <form className="search__form">
                <input type="text" className="search__form_input" placeholder="Фильм"></input>
                <button type="submit" className="search__form_button"></button>
            </form>
            <div className="search__container">
                <label className="search__container_checkbox">
                    <input type="checkbox" className="search__container_checkbox-input"/>
                    <div className="search__container_checkbox-text">Короткометражки</div>
                </label>
            </div>
        </section>
    )
}

export default SearchForm;