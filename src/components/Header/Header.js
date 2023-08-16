import { Link } from "react-router-dom";

function Header () {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo" />
                <div className="header__links">
                    <>
                        <Link to="/signup" className="header__link-up">Регистрация</Link>
                        <Link to="/signin" className="header__link-in">Войти</Link>
                    </>
                </div>
            </div>
        </header>
    )
}

export default Header;