import React, { useState, useEffect } from 'react';
import navTabLogo from "../../images/blue_logo.svg";

function NavTab () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => setWindowDimensions(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="nav-tab">
            <div className="nav-tab__container">
                <img className="nav-tab__logo" src={navTabLogo} alt="Изображение логотипа в виде синего цветка" />
                    {
                        windowDimensions < 820
                        ?
                            <div className={`nav-tab__burger-menu ${isMenuOpen ? "nav-tab__burger-menu_open" : ""}`} onClick={toggleMenu} />
                        :
                        <>
                            <div className="nav-tab__links">
                                <button className="nav-tab__links_button">Фильмы</button>
                                <button className="nav-tab__links_button">Сохранённые фильмы</button>
                            </div>
                            <button className="nav-tab__button_acc">Аккаунт</button>
                        </>
                    }
            </div>
        </div>
    )
}

export default NavTab;