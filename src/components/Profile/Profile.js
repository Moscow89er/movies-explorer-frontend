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
                <div className="profile__form_container">
                    <p className="profile__paragraph">Имя</p>
                    <div className="profile__input_wrapper">
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
                        <span className="profile__error_name">{formErrors.name}</span>
                    </div>
                </div>
                <div className="profile__form_container">
                    <p className="profile__paragraph">E-mail</p>
                    <div className="profile__input_wrapper">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email || ""}
                            onChange={handleInputChange}
                            className={`profile__input ${formErrors.email ? "profile__input_error" : ""}`}
                            required
                        />
                        <span className="profile__error_email">{formErrors.email}</span>
                    </div>
                </div>
            </form>
            <button type="button" className="profile__button_edit">Редактировать</button>
            <Link to="/">
                <button type="button" className="profile__button_exit">Выйти из аккаунта</button>
            </Link>
        </section>
    )
}

export default Profile;