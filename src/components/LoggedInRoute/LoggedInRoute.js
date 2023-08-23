import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const LoggedInRoute = ({ element: Component, loggedIn, tokenChecked, ...props }) => {
    if (!tokenChecked) {
        return <Preloader />
    }

    return (
        loggedIn ? <Navigate to="/" replace /> : <Component {...props} />
    )
}

export default React.memo(LoggedInRoute);