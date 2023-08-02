import headerLogo from '../../images/header_logo.svg';

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Изображение логотипа в виде синего цветка"></img>
            <div className="header__container">
                <button className="header__link_sign-up">Регистрация</button>
                <button className="header__link_sign-in">Войти</button>
            </div>
        </header>
    )
}

export default Header;