import React from "react";
import { Link } from "react-router-dom";
import useFormValidator from "../../utils/useFormValidator";


function FormContainer ({ titleText, buttonText, paragraphText, parentComponent }) {
    const initialState = {
        name: "Виталий",
        email: "pochta@yandex.ru",
        password: ""
    }

    const { formValues, formErrors, handleInputChange } = useFormValidator(initialState);

    return (
        <main className="form-container">
            <div className="form-container__elements">
                <Link to="/" className="form-container__logo" />
                <h2 className="form-container__title">{titleText}</h2>
                <form className="form-container__form">
                    {parentComponent === "Register" &&
                    <>
                        <p className="form-container__subtitle">Имя</p>
                        <div className="form-container__input-wrapper">
                            <input
                                type="text"
                                name="name"
                                placeholder="Введите имя"
                                value={formValues.name}
                                onChange={handleInputChange}
                                className={`form-container__input ${formErrors.name ? "form-container__input_error" : ""}`}
                                minLength="2"
                                maxLength="30"
                                required
                            />
                            <span className="form-container__error">{formErrors.name}</span>
                        </div>
                    </>
                    }
                    <p className="form-container__subtitle">E-mail</p>
                    <div className="form-container__input-wrapper">
                        <input
                            type="email"
                            name="email"
                            placeholder="Введите адрес почты"
                            value={formValues.email}
                            onChange={handleInputChange}
                            className={`form-container__input ${formErrors.email ? "form-container__input_error" : ""}`}
                            required
                        />
                        <span className="form-container__error">{formErrors.email}</span>
                    </div>
                    <p className="form-container__subtitle">Пароль</p>
                    <div className="form-container__input-wrapper">
                        <input
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={formValues.password}
                            onChange={handleInputChange}
                            className={`form-container__input ${formErrors.password ? "form-container__input_error" : ""}`}
                            required
                        />
                        <span className="form-container__error">{formErrors.password}</span>
                    </div>
                    {parentComponent === "Register"
                        ? 
                        <Link to="/movies" className="form-container__button-submit">{buttonText}</Link>
                        :
                        <Link to="/movies" className="form-container__button-login">{buttonText}</Link>
                    }
                </form>
                <div className="form-container__links">
                    <p className="form-container__text">{paragraphText}</p>
                    {parentComponent === "Register"
                        ? <Link to="/signin" className="form-container__link">Войти</Link>
                        : <Link to="/signup" className="form-container__link">Регистрация</Link>
                    }
                </div>
            </div>
        </main>
    )
}

export default FormContainer;