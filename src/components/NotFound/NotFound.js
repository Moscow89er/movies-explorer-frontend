import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound () {
    let navigate = useNavigate();

    const previousPage = () => navigate(-1);

    return (
        <main className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__subtitle">Страница не найдена</p>
            <p className="not-found__link" onClick={previousPage}>Назад</p>
        </main>
    )
}

export default NotFound;