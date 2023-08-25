function Portfolio () {
    return (
        <section className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <ul className="portfolio__links">
                <li className="portfolio__container">
                    <a 
                        className="portfolio__link"
                        href="https://moscow89er.github.io/budget-tracking-react/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h3 className="portfolio__subtitle">Приложение по учету финансов</h3>
                        <div className="portfolio__image" />
                    </a>
                </li>
                <li className="portfolio__container">
                    <a 
                        className="portfolio__link"
                        href="https://moscow89er.github.io/russian-travel/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
                        <div className="portfolio__image" />
                    </a>
                </li>
                <li className="portfolio__container">
                    <a
                        className="portfolio__link"
                        href="https://moscow89er.github.io/react-mesto-auth/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
                        <div className="portfolio__image" />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;