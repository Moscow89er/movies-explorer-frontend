import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";

function Navigation () {
    const location = useLocation();

    return (
        location.pathname === "/"
          ?
            <Header />
          :  
            <NavTab />
    )
}

export default Navigation;