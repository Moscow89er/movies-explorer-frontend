import React from "react";
import formContainerLogo from "../../images/blue_logo.svg";
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
                <img className="form-container__logo" src={formContainerLogo} alt="Изображение логотипа в виде синего цветка" />
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
                            minLength={4}
                            maxLength={16}
                        />
                        <span className="form-container__error">{formErrors.password}</span>
                    </div>
                    {parentComponent === "Register"
                        ? <button className="form-container__button_submit">{buttonText}</button>
                        : <button style={{margin: "158px auto 0"}} className="form-container__button_submit">{buttonText}</button>
                    }
                </form>
                <div className="form-container__links">
                    <p className="form-container__links_paragraph">{paragraphText}</p>
                    {parentComponent === "Register"
                        ? <a href="#" className="form-container__link">Войти</a>
                        : <a href="#" className="form-container__link">Регистрация</a>
                    }
                </div>
            </div>
        </section>
    )
}

export default FormContainer;