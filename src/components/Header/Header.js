import headerLogo from '../../images/blue_logo.svg';

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Изображение логотипа в виде синего цветка" />
            <div className="header__container">
                <button className="header__button_up">Регистрация</button>
                <button className="header__button_in">Войти</button>
            </div>
        </header>
    )
}

export default Header;