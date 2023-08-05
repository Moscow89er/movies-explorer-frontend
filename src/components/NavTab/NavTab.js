import { useLocation } from 'react-router-dom';

function NavTab () {
    const location = useLocation();

    return (
        <div className="nav-tab">
            { location.pathname === "/"
                ?
                    <>
                        <button className="nav-tab__button_in">Регистрация</button>
                        <button className="nav-tab__button_up">Войти</button>
                    </>
                :
                    <>
                        <div className="nav-tab__container">
                            <button className="nav-tab__container_button">Фильмы</button>
                            <button className="nav-tab__container_button">Сохранённые фильмы</button>
                        </div>
                        <button className="nav-tab__button_acc">Аккаунт</button>
                    </>
            }
        </div>
    )
}

export default NavTab;