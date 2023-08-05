import movieCardPic from "../../images/movie_card_pic.png"

function MoviesCard () {
    return (
        <section className="movies-card">
            <div className="movies-card__list">
                <div className="movies-card__container">
                    <img 
                        src={movieCardPic}
                        className="movies-card__pic"
                        alt="Изображение фильма"
                    />
                    <div className="movies-card__container">
                        <h3 className="movies-card__title">33 слова о дизайне</h3>
                        <label className="movies-card_radio">
                            <input type="radio" className="movies-card_radio_input"/>
                            <div className="movies-card_radio_circle" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoviesCard;