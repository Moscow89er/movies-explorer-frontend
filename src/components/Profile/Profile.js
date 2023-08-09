import React from "react";
import useFormValidator from "../../utils/useFormValidator";

function Profile () {
    const initialState ={
        name: "Виталий",
        email: "pochta@yandex.ru"
    }

    const {
        formValues,
        handleInputChange
    } = useFormValidator(initialState);

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {formValues.name}!</h2> 
            <form className="profile__form">
                <div className="profile__form_container">
                    <p className="profile__paragraph">Имя</p>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name || ""}
                        onChange={handleInputChange}
                        className="profile__input"
                    />
                </div>
                <div className="profile__form_container">
                    <p className="profile__paragraph">E-mail</p>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email || ""}
                        onChange={handleInputChange}
                        className="profile__input"
                    />
                </div>
            </form>
            <button type="button" className="profile__button_edit">Редактировать</button>
            <button type="button" className="profile__button_exit">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;