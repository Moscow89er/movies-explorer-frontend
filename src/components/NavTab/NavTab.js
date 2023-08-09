import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function NavTab () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverlay, setIsOverlay] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

    const toggleMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        setIsOverlay(newState);
    };

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
                            <div className="nav-tab__links">
                                <Link to="/movies" className="nav-tab__links_link">Фильмы</Link>
                                <Link to="/saved-movies" className="nav-tab__links_link">Сохранённые фильмы</Link>
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
                    <Link to="/" className="nav-tab__links_link">Главная</Link>
                    <Link to="/movies" className="nav-tab__links_link">Фильмы</Link>
                    <Link to="/saved-movies" className="nav-tab__links_link">Сохранённые фильмы</Link>
                </div>
                <button className="nav-tab__button_acc">Аккаунт</button>
            </div>
            {
                isOverlay && <div className='nav-tab__overlay' />
            }
        </div>
    )
}

export default NavTab;