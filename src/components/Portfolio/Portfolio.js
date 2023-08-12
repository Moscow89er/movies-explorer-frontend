function Portfolio () {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio__container">
                <a 
                    className="portfolio__link"
                    href="https://github.com/Moscow89er/how-to-learn/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3 className="portfolio__subtitle">Статичный сайт</h3>
                    <div className="portfolio__image" />
                </a>
            </div>
            <div className="portfolio__container">
                <a 
                    className="portfolio__link"
                    href="https://moscow89er.github.io/russian-travel/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
                    <div className="portfolio__image" />
                </a>
            </div>
            <div className="portfolio__container">
                <a
                    className="portfolio__link"
                    href="https://moscow89er.github.io/react-mesto-auth/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
                    <div className="portfolio__image" />
                </a>
            </div>
        </section>
    )
}

export default Portfolio;