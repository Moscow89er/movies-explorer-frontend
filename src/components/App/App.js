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
import moviesApi from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(16);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.setToken(token);
      setLoggedIn(true);
    }

    if (loggedIn) {
      mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleMovies () {
    setIsloading(true);
    return moviesApi.getMovies()
    .then((moviesData) => {
      const movies = moviesData.map(movie => ({
        pic: movie.image.url,
        title: movie.nameRU,
        time: movie.duration,
        id: movie.id,
      }));
      setMovies(movies);
      })
      .catch((err) => {
        setHasError(err);
        console.log(err);
      })
      .finally(() => {
        setIsloading(false);
        setHasSearched(true);
      });
  }

  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoTooltipOpen(true);
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
        setIsError(true);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function signOut() {
    mainApi.setToken('');
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  }

  function handleUpdateUser(userData) {
    mainApi.editUserInfo(userData)
      .then((data) => {
        setIsError(false);
        setIsInfoTooltipOpen(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleLoadMore() {
    setCardsToShow(cardsToShow + 4);
  }

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
        {!loggedIn ? renderHeaderAndFooter && <Header />
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
              onGetMovies={handleMovies}
              movies={movies}
              isLoading={isLoading}
              hasSearched={hasSearched}
              hasError={hasError}
              onLoadMore={handleLoadMore}
              cardsToShow={cardsToShow}
            />} 
          />
          <Route 
            path="/saved-movies"
            element={
            <ProtectedRoute 
              element={SavedMovies}
              loggedIn={loggedIn}
              onGetMovies={handleMovies}
              movies={movies}
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isError={isError}
          onClose={closeInfoTooltip}
          tooltipConfirm="Данные сохранены успешно!"
          tooltipError="Что-то пошло не так!
          Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;