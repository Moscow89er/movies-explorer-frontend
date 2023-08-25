function AboutProject () {
    return (
        <section className="about-projects">
            <h2 className="about-projects__title">О проекте</h2>
            <div className="about-projects__container">
                <h3 className="about-projects__subtitle">Проект включал 5 этапов</h3>
                <h3 className="about-projects__subtitle">На выполнение проекта ушло 4 недели</h3>
                <p className="about-projects__info">Составление плана, работу над бэкендом, вёрстку,
                    добавление функциональности и финальные доработки.
                </p>
                <p className="about-projects__info">Во время работы над проктом использовал принципы SOLID и Agile.
                </p>
            </div>
            <div className="about-projects__container">
                <p className="about-projects__one-week">1 неделя</p>
                <p className="about-projects__four-week">4 недели</p>
                <p className="about-projects__backend">Back-end</p>
                <p className="about-projects__frontend">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;