import { Link } from "react-router-dom";

function Header () {
    return (
        <header className="header">
            <Link to="/" className="header__logo" />
            <div className="header__container">
                <button className="header__button_up">Регистрация</button>
                <button className="header__button_in">Войти</button>
            </div>
        </header>
    )
}

export default Header;