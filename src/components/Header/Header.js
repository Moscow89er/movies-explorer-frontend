import { Link } from "react-router-dom";

function Header ({ isLoggedIn }) {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo" />
                <div className="header__links">
                    {isLoggedIn ? (
                        <Link to="profile" className="header__link-in">Профиль</Link>
                    ) : (
                        <>
                            <Link to="/signup" className="header__link-up">Регистрация</Link>
                            <Link to="/signin" className="header__link-in">Войти</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;