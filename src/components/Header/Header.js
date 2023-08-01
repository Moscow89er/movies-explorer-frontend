import headerLogo from '../../images/header_logo.svg';

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип в виде синего цветка"></img>
            <button className="header__link_sign-up">Регистрация</button>
            <button className="header__link_sign-in">Войти</button>
        </header>
    )
}

export default Header;