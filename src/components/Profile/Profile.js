import React from "react";
import { Link } from "react-router-dom";
import useFormValidator from "../../utils/useFormValidator";

function Profile () {
    const initialState ={
        name: "Виталий",
        email: "pochta@yandex.ru"
    }

    const {
        formValues,
        formErrors,
        handleInputChange
    } = useFormValidator(initialState);

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {formValues.name}!</h2> 
            <form className="profile__form">
                <div className="profile__container">
                    <p className="profile__subtitle">Имя</p>
                    <div className="profile__input-wrapper">
                        <input
                            type="text"
                            name="name"
                            value={formValues.name || ""}
                            onChange={handleInputChange}
                            className={`profile__input ${formErrors.name ? "profile__input_error" : ""}`}
                            minLength="2"
                            maxLength="30"
                            required
                        />
                        <span className="profile__error-name">{formErrors.name}</span>
                    </div>
                </div>
                <div className="profile__container">
                    <p className="profile__subtitle">E-mail</p>
                    <div className="profile__input-wrapper">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email || ""}
                            onChange={handleInputChange}
                            className={`profile__input ${formErrors.email ? "profile__input_error" : ""}`}
                            required
                        />
                        <span className="profile__error-email">{formErrors.email}</span>
                    </div>
                </div>
            </form>
            <button type="button" className="profile__button-edit">Редактировать</button>
            <Link to="/" className="profile__button-exit">Выйти из аккаунта</Link>
        </section>
    )
}

export default Profile;