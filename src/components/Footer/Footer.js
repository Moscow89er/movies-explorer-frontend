import { useLocation } from "react-router-dom";

function Footer () {
    const location = useLocation();

    return (
        location.pathname === "/profile" || location.pathname === "/signin" || location.pathname === "/signup"
        ?
        null 
        :
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__container_year">© 2023</p>
                <div className="footer__container_links">
                    <a className="footer__container_link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    <a className="footer__container_link" href="https://github.com/Moscow89er/">Github</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;