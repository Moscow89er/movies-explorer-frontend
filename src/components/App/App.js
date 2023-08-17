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
  const [isMoviesPopupOpen, setIsMoviesPopupOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [isLoading, setIsloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState([]);

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

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies'));

    if (savedMovies) setMovies(savedMovies);
  }, [])

  useEffect(() => {
    updateDisplayedMovies();
  }, [searchKeyword, isShortMoviesChecked])

  function handleMovies () {
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
      if (movies.length === 0) {
        setIsMoviesPopupOpen(true);
      }
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
    localStorage.removeItem('movies');
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

  function filterMoviesByKeyword(movies, keyword) {
    const loweredKeyword = keyword.toLowerCase();
    console.log(movies)
    return movies.filter(movie =>
      (movie.nameRU && movie.nameRU.toLowerCase().includes(loweredKeyword)) ||
      (movie.nameEN && movie.nameEN.toLowerCase().includes(loweredKeyword)) ||
      (movie.description && movie.description.toLowerCase().includes(loweredKeyword))
    )
  }

  function filteredShortMovies(movies, isChecked) {
    return isChecked ? movies.filter(movie => movie.duration <= 40) : movies;
  }

  function updateDisplayedMovies() {
    let filteredMovies = [...filterMoviesByKeyword(movies, searchKeyword)];
    filteredMovies = [...filteredShortMovies(filteredMovies, isShortMoviesChecked)];
    setDisplayedMovies(filteredMovies);
  }

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
              onGetMovies={handleMovies}
              movies={displayedMovies}
              isLoading={isLoading}
              hasSearched={hasSearched}
              hasError={hasError}
              isOpen={isMoviesPopupOpen}
              onClose={closePopups}
              onKeyword={setSearchKeyword}
              onShortMoviesChecked={setIsShortMoviesChecked}
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