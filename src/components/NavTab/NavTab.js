import React, { useState, useEffect } from 'react';
import { Link, useMatch, useLocation } from "react-router-dom";

function NavTab () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverlay, setIsOverlay] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

    const location = useLocation();

    console.log(location.pathname);

    const toggleMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        setIsOverlay(newState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsOverlay(false);
    }

    useEffect(() => {
        const handleResize = () => setWindowDimensions(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="nav-tab">
            <div className="nav-tab__container">
                <Link to="/" className="nav-tab__logo" />
                    {
                        windowDimensions < 820
                        ?   
                            <div className={`nav-tab__button ${isMenuOpen ? "nav-tab__button_clicked" : ""}`} onClick={toggleMenu} />
                        :
                        <>
                            <div
                                className="nav-tab__links"
                                style={
                                    location.pathname === "/profile" ||
                                    location.pathname === "/saved-movies"
                                    ? { marginLeft: '42px' } : {}
                                }
                            >
                                <Link
                                    style={
                                        location.pathname === "/profile" ||
                                        location.pathname === "/saved-movies"
                                        ? { marginRight: '18px' } : {}
                                    }
                                    to="/movies"
                                    className="nav-tab__link"
                                >
                                    Фильмы
                                </Link>
                                <Link
                                    to="/saved-movies"
                                    className="nav-tab__link"
                                >
                                    Сохранённые фильмы
                                </Link>
                            </div>
                            <Link to="/profile">
                                <button className="nav-tab__button_acc">Аккаунт</button>
                            </Link>
                        </>
                    }
            </div>
            <div className={`nav-tab__burger-menu ${isMenuOpen ? "nav-tab__burger-menu_open" : ""}`}>
                <button className="nav-tab__button_close" onClick={toggleMenu}></button>
                <div className="nav-tab__links">
                    <Link 
                        to="/"
                        className={useMatch("/") ? "nav-tab__link_active" : "nav-tab__link"}
                        onClick={closeMenu}
                    >
                        Главная
                    </Link>
                    <Link
                        to="/movies"
                        className={useMatch("/movies") ? "nav-tab__link_active" : "nav-tab__link"}
                        onClick={closeMenu}
                    >
                        Фильмы
                    </Link>
                    <Link
                        to="/saved-movies"
                        className={useMatch("/saved-movies") ? "nav-tab__link_active" : "nav-tab__link"}
                        onClick={closeMenu}
                    >
                        Сохранённые фильмы
                    </Link>
                </div>
                <Link to="/profile">
                    <button className="nav-tab__button_acc" onClick={closeMenu}>Аккаунт</button>
                </Link>
            </div>
            {
                isOverlay && <div className='nav-tab__overlay' />
            }
        </div>
    )
}

export default NavTab;