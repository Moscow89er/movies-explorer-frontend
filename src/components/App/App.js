import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NavTab from "../NavTab/NavTab"; 
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import mainApi from "../../utils/MainApi";

function App() {
  const location = useLocation();
  const isLoggedIn = false;
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin', {replace: true});
        console.log({ name, email, password });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shouldRenderHeaderAndFooter = (pathname) => {
    const pathWithoutNavAndFooter = ["/signin", "/signup"];
    const allKnownPaths = ["/", "/movies", "/saved-movies", "/profile", "/signin", "/signup"];

    if (pathWithoutNavAndFooter.includes(pathname)) {
      return false;
    }

    if (allKnownPaths.includes(pathname)) {
      return true;
    }
    return false;
  }

  const renderHeaderAndFooter = shouldRenderHeaderAndFooter(location.pathname);

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        {location.pathname === "/" ? renderHeaderAndFooter && <Header isLoggedIn={isLoggedIn} />
        : renderHeaderAndFooter && <NavTab />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {location.pathname === "/profile" ? null : renderHeaderAndFooter && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;