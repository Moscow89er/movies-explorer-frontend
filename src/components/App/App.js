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

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) ?? null);
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') ?? "");
  const [moviesInputValue, setMoviesInputValue] = useState(localStorage.getItem('searchKeyword') ?? "");
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(JSON.parse(localStorage.getItem('isShortMoviesChecked')) ?? false);

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
  }, [loggedIn])

  const removeAllMoviesData = () => localStorage.removeItem('movies')

  useEffect(() => {
      window.addEventListener('beforeunload', removeAllMoviesData);
      return () => {
          window.removeEventListener('beforeunload', removeAllMoviesData);
      }
  }, [])

  useEffect(() => {
    if(loggedIn) {
      localStorage.setItem('searchKeyword', searchKeyword);
      localStorage.setItem(
        'isShortMoviesChecked',
        JSON.stringify(isShortMoviesChecked)
      );
    }
  }, [loggedIn, searchKeyword, isShortMoviesChecked])

  useEffect (() => {
    if (!movies && searchKeyword.length > 0) {
      if ('movies' in localStorage) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setSearchKeyword(localStorage.getItem('searchKeyword'));
        setIsShortMoviesChecked(JSON.parse(localStorage.getItem('isShortMoviesChecked')));
      } else {
        setIsloading(true);
        moviesApi.getMovies()
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
  }, [movies, searchKeyword, isShortMoviesChecked])

  const filterMovies = useCallback((movies, searchKeyword, isShortMoviesChecked) => {
    if (!movies) {
      return null;
    }

    const loweredKeyword = searchKeyword ? searchKeyword.toLowerCase() : "";

    return movies.filter(movie => {
      const matchesKeyword =
        (movie.nameRU && movie.nameRU.toLowerCase().includes(loweredKeyword)) ||
        (movie.nameEN && movie.nameEN.toLowerCase().includes(loweredKeyword)) ||
        (movie.description && movie.description.toLowerCase().includes(loweredKeyword))

      const matchesDuration = isShortMoviesChecked ? movie.duration <= 40 : true;

      return matchesKeyword && matchesDuration;
    })
  }, [])

  const handleRegister = ({ name, email, password }) => {
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

  const handleLogin = ({ email, password }) => {
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

  const signOut = () => {
    mainApi.setToken('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('isShortMoviesChecked');
    setMovies(null);
    setSearchKeyword('');
    setIsShortMoviesChecked(false);
    setMoviesInputValue('');
    setLoggedIn(false);
    navigate('/');
  }

  const handleUpdateUser = (userData) => {
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

  const closePopups = () => {
    setIsInfoTooltipOpen(false);
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
              movies={filterMovies(
                movies,
                searchKeyword,
                isShortMoviesChecked
              )}
              isLoading={isLoading}
              hasSearched={hasSearched}
              hasError={hasError}
              isOpen={isMoviesPopupOpen}
              inputValue={moviesInputValue}
              setInputValue={setMoviesInputValue}
              setIsShortChecked={setIsShortMoviesChecked}
              isShortChecked={isShortMoviesChecked}
              setSearchKeyword={setSearchKeyword}
            />}
          />
          <Route
            path="/saved-movies"
            element={
            <ProtectedRoute 
              element={SavedMovies}
              loggedIn={loggedIn}
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