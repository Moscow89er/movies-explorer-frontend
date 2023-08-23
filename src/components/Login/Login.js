import React from 'react';
import FormContainer from "../FormContainer/FormContainer";
import useFormValidator from "../../utils/useFormValidator";

function Login({ onLogin, loggedIn, isSubmitting }) {
    const initialState = {
        email: "",
        password: ""
    };

    const { 
        formValues,
        formErrors,
        isValid,
        handleInputChange
    } = useFormValidator(initialState);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(formValues);
    };

    return (
        <FormContainer
            titleText="Рады видеть!"
            buttonText="Войти"
            paragraphText="Ещё не зарегистрированы?"
            onSubmit={handleSubmit}
            link="/signup"
            linkText="Регистрация"
            isValid={isValid}
            isSubmitting={isSubmitting}
        >
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
        </FormContainer>
    );
}

export default Login;