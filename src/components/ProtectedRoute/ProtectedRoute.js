import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({ element: Component, loggedIn, tokenChecked, ...props }) => {
    if (!tokenChecked) {
        return <Preloader />
    }
    
    return (
        loggedIn ? <Component {...props} /> : <Navigate to="/" />
    )
}

export default React.memo(ProtectedRoute);