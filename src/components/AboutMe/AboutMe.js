import aboutMePhoto from "../../images/about-me_photo.png";

function AboutMe () {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__container-text">
                    <h3 className="about-me__container-text_title">Виталий</h3>
                    <p className="about-me__container-text_subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__container-text_paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="about-me__container-text_link" href="https://github.com/Moscow89er/" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img className="about-me__container_image" src={aboutMePhoto} alt="фотография студента" />
            </div>
        </section>
    )
}

export default AboutMe;