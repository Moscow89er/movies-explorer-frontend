import headerLogo from '../../images/header_logo.svg';
import NavTab from '../NavTab/NavTab';

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Изображение логотипа в виде синего цветка" />
            <NavTab />
        </header>
    )
}

export default Header;