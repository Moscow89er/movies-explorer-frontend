import React, { useState } from "react";
import formContainerLogo from "../../images/blue_logo.svg"


function FormContainer ({ titleText, buttonText, paragraphText, parentComponent }) {
    const [valueName, setValueName] = useState("Виталий");
    const [valueEmail, setValueEmail] = useState("pochta@yandex.ru");
    const [valuePassword, setValuePassword] = useState("");

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        if (name === 'name') {
            setValueName(value);
        } else if (name === 'email') {
            setValueEmail(value);
        } else if (name === 'password') {
            setValuePassword(value);
        }
    }

    return (
        <section className="form-container">
            <div className="form-container__elements">
                <img className="form-container__logo" src={formContainerLogo} alt="Изображение логотипа в виде синего цветка" />
                <h2 className="form-container__title">{titleText}</h2>
                <form className="form-container__form">
                    {parentComponent === "Register" &&
                    <>
                        <p className="form-container__paragraph">Имя</p>
                        <input
                            type="text"
                            name="name"
                            value={valueName}
                            onChange={handleInputChange}
                            className="form-container__input"
                        />
                        <span className="form-container__error"></span>
                    </>
                    }
                    <p className="form-container__paragraph">E-mail</p>
                    <input
                        type="email"
                        name="email"
                        value={valueEmail}
                        onChange={handleInputChange}
                        className="form-container__input"
                    />
                    <span className="form-container__error"></span>
                    <p className="form-container__paragraph">Пароль</p>
                    <input
                        type="password"
                        name="password"
                        value={valuePassword}
                        onChange={handleInputChange}
                        className="form-container__input"
                    />
                    <span className="form-container__error">Что-то пошло не так...</span>
                    <button className="form-container__button_submit">{buttonText}</button>
                </form>
                <div className="form-container__links">
                    <p className="form-container__links_paragraph">{paragraphText}</p>
                    {parentComponent === "Register"
                        ? <a className="form-container__link">Войти</a>
                        : <a className="form-container__link">Регистрация</a>
                    }
                </div>
            </div>
        </section>
    )
}

export default FormContainer;