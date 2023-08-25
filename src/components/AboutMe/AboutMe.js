import aboutMePhoto from "../../images/about-me_photo.png";

function AboutMe () {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__text">
                    <h3 className="about-me__name">Никита</h3>
                    <p className="about-me__profession">Фронтенд-разработчик, 33 года</p>
                    <p className="about-me__info">Родился и живу в Москве, студент Университета Синергия по специальности "Психология".
                        Увлекаюсь программированием, музыкой и спортом. Frontend-разработчик с 1,5-летним опытом,
                        специализируюсь на TS, React и Node.js.
                    </p>
                    <a 
                        className="about-me__link"
                        href="https://github.com/Moscow89er/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>
                </div>
                <img className="about-me__image" src={aboutMePhoto} alt="Фотография студента" />
            </div>
        </section>
    )
}

export default AboutMe;