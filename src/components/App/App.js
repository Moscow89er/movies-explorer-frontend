import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);


  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin', {replace: true});
        console.log({ name, email, password });
      })
      .catch((err) => {
        console.log(err);
      })
  }  

  function handleLogin({ email, password }) {
    return mainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  }

  function handleUpdateUser(userData) {
    mainApi.editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
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
        {location.pathname === "/" ? renderHeaderAndFooter && <Header isLoggedIn={loggedIn} />
        : renderHeaderAndFooter && <NavTab />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/movies"
            element={
            <ProtectedRoute 
              element={Movies}
              loggedIn={loggedIn}
            />} 
          />
          <Route 
            path="/saved-movies"
            element={
            <ProtectedRoute 
              element={SavedMovies}
              loggedIn={loggedIn}
            />}
          />
          <Route 
            path="/profile"
            element={
            <ProtectedRoute 
              element={Profile} 
              onSignOut={signOut} 
              onUpdateUser={handleUpdateUser}
              loggedIn={loggedIn}
            />}
           />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {location.pathname === "/profile" ? null : renderHeaderAndFooter && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;