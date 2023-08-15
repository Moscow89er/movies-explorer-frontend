import { useEffect } from "react";
import onSucces from "../../images/on_succes.png";
import onError from "../../images/on_error.png";

function InfoTooltip ({ isOpen, onClose, isError, tooltipConfirm, tooltipError }) {
    useEffect(() => {
        if (!isOpen) return;

        function handleESC(evt) {
            if (evt.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleESC);

        return () => document.removeEventListener("keydown", handleESC)
    }, [isOpen, onClose]);

    return (
        <section className={`popup-tooltip ${isOpen ? "popup-tooltip_opened" : ""}`}>
            <div className="popup-tooltip__container">
                <img src={isError ? onError : onSucces} className="popup-tooltip__icon" alt="изображение лого"></img>
                <h2 className="popup-tooltip__title">{isError ? tooltipError : tooltipConfirm}</h2>
                <button type="button" className="popup-tooltip__close-button"onClick={onClose}></button>
            </div>
        </section>
    );
}

export default InfoTooltip;