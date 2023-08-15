import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidator from "../../utils/useFormValidator";

function Profile ({ onSignOut, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const initialState ={
        name: currentUser.name,
        email: currentUser.email
    }

    const {
        formValues,
        formErrors,
        isValid,
        handleInputChange
    } = useFormValidator(initialState);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser(formValues);
    };

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, {formValues.name}!</h2> 
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__container">
                    <p className="profile__subtitle">Имя</p>
                    <div className="profile__input-wrapper">
                        <input
                            type="text"
                            name="name"
                            placeholder="Введите имя"
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
                            placeholder="Введите адрес почты"
                            value={formValues.email || ""}
                            onChange={handleInputChange}
                            className={`profile__input ${formErrors.email ? "profile__input_error" : ""}`}
                            required
                        />
                        <span className="profile__error-email">{formErrors.email}</span>
                    </div>
                </div>
                <button
                    disabled={!isValid}
                    type="submit"
                    className={isValid ? "profile__button-edit" : "profile__button-edit_disabled"}
                >
                    Редактировать
                </button>
            </form>
            <button type="button" className="profile__button-exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </main>
    )
}

export default Profile;