import React, { useState, useEffect, useCallback } from "react";
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
  const [isMoviesPopupOpen, setIsMoviesPopupOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [movies, setMovies] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') || "");
  const [moviesInputValue, setMoviesInputValue] = useState(localStorage.getItem('searchKeyword') || "");
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(JSON.parse(localStorage.getItem('isShortMoviesChecked')) || false);

  const navigate = useNavigate();
  const renderHeaderAndFooter = shouldRenderHeaderAndFooter(location.pathname);

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
  }, [loggedIn])

  function handleMovies () {
    if (!movies && searchKeyword.length > 0) {
      if ('movies' in localStorage) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setSearchKeyword(localStorage.getItem('searchKeyword'));
        setIsShortMoviesChecked(JSON.parse(localStorage.getItem('beatFilmsIsShort')));
      } else {
        setIsloading(true);
        return moviesApi.getMovies()
          .then((moviesData) => {
            const movies = moviesData.map(movie => ({
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: movie.image.url,
              trailerLink: movie.trailerLink,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              thumbnail: movie.image.formats.thumbnail.url,
              movieId: movie.id
            }));
            setMovies(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
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
    }
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
    localStorage.removeItem('movies');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('isShortMoviesChecked');
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

  function closePopups() {
    setIsInfoTooltipOpen(false);
    setIsMoviesPopupOpen(false);
  }

  const filterMovies = useCallback((movies, searchKeyword, isShortMoviesChecked) => {
    if (!movies) {
      return [];
    }

    const loweredKeyword = searchKeyword.toLowerCase();

    return movies.filter(movie => {
      const matchesKeyword =
        (movie.nameRU && movie.nameRU.toLowerCase().includes(loweredKeyword)) ||
        (movie.nameEN && movie.nameEN.toLowerCase().includes(loweredKeyword)) ||
        (movie.description && movie.description.toLowerCase().includes(loweredKeyword))

      const matchesDuration = isShortMoviesChecked ? movie.duration <= 40 : true;

      return matchesKeyword && matchesDuration;
    })
  }, [])

  function shouldRenderHeaderAndFooter(pathname) {
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
              getMovies={handleMovies}
              movies={filterMovies(
                movies,
                searchKeyword,
                isShortMoviesChecked
              )}
              inputValue={moviesInputValue}
              setInputValue={setMoviesInputValue}
              isLoading={isLoading}
              hasSearched={hasSearched}
              hasError={hasError}
              isOpen={isMoviesPopupOpen}
              onClose={closePopups}
              setIsShortChecked={setIsShortMoviesChecked}
              isShortChecked={isShortMoviesChecked}
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
          onClose={closePopups}
          tooltipConfirm="Данные сохранены успешно!"
          tooltipError="Что-то пошло не так!
          Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;