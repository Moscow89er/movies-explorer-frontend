import React, { useState } from "react";

function Profile () {
    const [valueName, setValueName] = useState("Виталий");
    const [valueEmail, setValueEmail] = useState("pochta@yandex.ru");

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        if (name === 'name') {
            setValueName(value);
        } else if (name === 'email') {
            setValueEmail(value);
        }
    }

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {valueName}!</h2> 
            <form className="profile__form">
                <p className="profile__paragraph">Имя</p>
                <input
                    type="text"
                    name="name"
                    value={valueName}
                    onChange={handleInputChange}
                    className="profile__input"
                />
            </form>
            <form className="profile__form">
                <p className="profile__paragraph">E-mail</p>
                <input
                    type="email"
                    name="email"
                    value={valueEmail}
                    onChange={handleInputChange}
                    className="profile__input"
                />
            </form>
            <button type="button" className="profile__button_edit">Редактировать</button>
            <button type="button" className="profile__button_exit">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;