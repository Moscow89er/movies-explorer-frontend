import React from 'react';
import FormContainer from "../FormContainer/FormContainer";
import useFormValidator from "../../utils/useFormValidator";

function Register({ onRegister }) {
    const initialState = {
        name: "",
        email: "",
        password: ""
    };

    const { formValues, formErrors, isValid, handleInputChange } = useFormValidator(initialState);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { name, email, password } = formValues;
        onRegister(name, email, password);
    };

    return (
        <FormContainer
            titleText="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            paragraphText="Уже зарегистрированы?"
            onSubmit={handleSubmit}
            link="/signin"
            linkText="Войти"
            isValid={isValid}
        >
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

export default Register;
