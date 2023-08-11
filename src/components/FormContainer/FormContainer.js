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
        <section className="form-container">
            <div className="form-container__elements">
                <Link to="/" className="form-container__logo" />
                <h2 className="form-container__title">{titleText}</h2>
                <form className="form-container__form">
                    {parentComponent === "Register" &&
                    <>
                        <p className="form-container__paragraph">Имя</p>
                        <div className="form-container__input_wrapper">
                            <input
                                type="text"
                                name="name"
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
                    <p className="form-container__paragraph">E-mail</p>
                    <div className="form-container__input_wrapper">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            className={`form-container__input ${formErrors.email ? "form-container__input_error" : ""}`}
                            required
                        />
                        <span className="form-container__error">{formErrors.email}</span>
                    </div>
                    <p className="form-container__paragraph">Пароль</p>
                    <div className="form-container__input_wrapper">
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            className={`form-container__input ${formErrors.password ? "form-container__input_error" : ""}`}
                            required
                        />
                        <span className="form-container__error">{formErrors.password}</span>
                    </div>
                    {parentComponent === "Register"
                        ? 
                        <Link to="/movies">
                            <button className="form-container__button_submit">{buttonText}</button>
                        </Link>
                        :
                        <Link to="/movies">
                            <button className="form-container__button_submit-login">{buttonText}</button>
                        </Link>
                    }
                </form>
                <div className="form-container__links">
                    <p className="form-container__links_paragraph">{paragraphText}</p>
                    {parentComponent === "Register"
                        ? <Link to="/signin" className="form-container__link">Войти</Link>
                        : <Link to="/signup" className="form-container__link">Регистрация</Link>
                    }
                </div>
            </div>
        </section>
    )
}

export default FormContainer;