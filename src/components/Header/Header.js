import { Link } from "react-router-dom";

function Header ({ isLoggedIn }) {
    return (
        <header className="header">
            <Link to="/" className="header__logo" />
            <div className="header__container">
                {isLoggedIn ? (
                    <Link to="profile" className="header__link_in">Профиль</Link>
                ) : (
                    <>
                        <Link to="/signup" className="header__link_up">Регистрация</Link>
                        <Link to="/signin" className="header__link_in">Войти</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;