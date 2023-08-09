function Portfolio () {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio__container">
                <a className="portfolio__container_link" href="https://github.com/Moscow89er/how-to-learn/">
                    <h3 className="portfolio__container_title">Статичный сайт</h3>
                    <div className="portfolio__container_image" alt="Изображение кнопки-ссылки в виде стрелки" />
                </a>
            </div>
            <div className="portfolio__container">
                <a className="portfolio__container_link" href="https://moscow89er.github.io/russian-travel /">
                    <h3 className="portfolio__container_title">Адаптивный сайт</h3>
                    <div className="portfolio__container_image" alt="Изображение кнопки-ссылки в виде стрелки" />
                </a>
            </div>
            <div className="portfolio__container">
                <a className="portfolio__container_link" href="https://moscow89er.github.io/react-mesto-auth/">
                    <h3 className="portfolio__container_title">Одностраничное приложение</h3>
                    <div className="portfolio__container_image" alt="Изображение кнопки-ссылки в виде стрелки" />
                </a>
            </div>
        </section>
    )
}

export default Portfolio;