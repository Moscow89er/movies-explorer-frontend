import { useLocation } from "react-router-dom";

function Footer () {
    const location = useLocation();

    return (
        <footer className="footer">
            <h2 className="footer__title" style={location.pathname === "/saved-movies" ? { margin: '80px auto 0 auto' } : {}}>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__container_year">© 2023</p>
                <div className="footer__container_links">
                    <a className="footer__container_link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    <a className="footer__container_link" href="https://github.com/Moscow89er/" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;