import React from "react";
import { Link } from "react-router-dom";

function FormContainer({ titleText, buttonText, paragraphText, onSubmit, children, link, linkText, isValid, isSubmitting }) {
    return (
        <main className="form-container">
            <div className="form-container__elements">
                <Link to="/" className="form-container__logo" />
                <h2 className="form-container__title">{titleText}</h2>
                <form className="form-container__form" onSubmit={onSubmit} noValidate>
                    {children}
                    <button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        className={isValid ? "form-container__button-submit" : "form-container__button-submit_disabled"}
                    >
                        {buttonText}
                    </button>
                </form>
                <div className="form-container__links">
                    <p className="form-container__text">{paragraphText}</p>
                    <Link to={link} className="form-container__link">{linkText}</Link>
                </div>
            </div>
        </main>
    );
}

export default FormContainer;
