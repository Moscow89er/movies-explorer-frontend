function AboutProject () {
    return (
        <section className="about-projects">
            <h2 className="about-projects__title">О проекте</h2>
            <div className="about-projects__container">
                <h3 className="about-projects__container_subtitle">Дипломный проект включал 5 этапов</h3>
                <h3 className="about-projects__container_subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about-projects__container_paragraph">Составление плана, работу над бэкендом, вёрстку,
                    добавление функциональности и финальные доработки.
                </p>
                <p className="about-projects__container_paragraph">У каждого этапа был мягкий и жёсткий дедлайн,
                    которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
            <div className="about-projects__container">
                <p className="about-projects__container_one-week">1 неделя</p>
                <p className="about-projects__container_four-week">4 недели</p>
                <p className="about-projects__container_backend">Back-end</p>
                <p className="about-projects__container_frontend">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;