import { movies } from "../../utils/data";

function MoviesCard () {
    return (
        <section className="movies-card">
            <div className="movies-card__container_items">
                {movies.map((movie) => (
                    <div className="movies-card__container_item" key={movie.id}>
                        <img 
                            src={movie.pic}
                            className="movies-card__pic"
                            alt="Изображение фильма"
                        />
                        <div className="movies-card__container_radio">
                            <h3 className="movies-card__title">{movie.title}</h3>
                            <label className="movies-card_radio">
                                <input type="radio" className="movies-card_radio_input"/>
                                <div className="movies-card_radio_circle" />
                            </label>
                        </div>
                        <p className="movies-card__time">{movie.time}</p>
                    </div>
                ))}
            </div>
            <button type="submit" className="movies-card_button">Ещё</button>
        </section>
    )
}

export default MoviesCard;