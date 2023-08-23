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
import LoggedInRoute from "../LoggedInRoute/LoggedInRoute";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tokenChecked, setTockenChecked] = useState(false);

  const [movies, setMovies] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') ?? "");
  const [moviesInputValue, setMoviesInputValue] = useState(localStorage.getItem('searchKeyword') ?? "");
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(JSON.parse(localStorage.getItem('isShortMoviesChecked')) ?? false);

  const [savedMovies, setSavedMovies] = useState(null);
  const [savedMoviesSearchKeyword, setSavedMoviesSearchKeyword] = useState("");
  const [savedMoviesInputValue, setSavedMoviesInputValue] = useState("");
  const [isShortSavedMoviesChecked, setIsShortSavedMoviesChecked] = useState(false);

  const navigate = useNavigate();

  const pageBackgroundClass = 
    location.pathname === "/movies" || location.pathname === "/saved-movies"
    ? "page page__movies-bg"
    : "page";

  const handleLikeMovie = (movie) => {
    const isMovieSaved = savedMovies ? savedMovies.some((item) => item.movieId === movie.id) : false;

    if (!isMovieSaved) {
      mainApi
        .saveMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: moviesApi._url + movie.image.url,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: moviesApi._url + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          owner: currentUser._id
        })
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies])
        })
        .catch((err) => console.log(err))
    } else {
      const savedMovieId = savedMovies.find(
        (item) => item.movieId === movie.id
      )._id;
      mainApi
        .deleteMovie(savedMovieId)
        .then(() => {
          setSavedMovies((state) => 
            state.filter((item) => item.movieId !== movie.id)
          )
      })
      .catch((err) => console.log(err));
    }
  }

  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => 
          state.filter((item) => item.movieId !== movie.movieId)
        )
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMovies()
        .then((movies) => setSavedMovies(movies.reverse()))
        .catch((err) => {
          setHasError(err);
          console.log(err);
        })
    }
  }, [loggedIn])

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
          .then((movies) => {
            setMovies(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
          })
          .catch((err) => {
            setHasError(err);
            console.log(err);
          })
          .finally(() => {
            setIsloading(false);
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

  const handleCheckToken = useCallback(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi 
        .getUserInfo(jwt)
        .then((data) => {
          const { _id, name, email } = data;
          setLoggedIn(true);
          setCurrentUser({ _id, name, email });
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTockenChecked(true);
        })
    } else {
      setTockenChecked(true);
    }
  }, [])

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken])

  const handleRegister = ({ name, email, password }) => {
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }  

  const handleLogin = async ({ email, password }) => {
    mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleCheckToken();
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('isShortMoviesChecked');
    setMovies(null);
    setSearchKeyword('');
    setIsShortMoviesChecked(false);
    setMoviesInputValue('');
    setLoggedIn(false);
    navigate('/', {replace: true});
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
    <div className={pageBackgroundClass}>
      <CurrentUserContext.Provider value={currentUser}>
        {!loggedIn ? renderHeaderAndFooter && <Header />
        : renderHeaderAndFooter && <NavTab />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <LoggedInRoute
                element={Register}
                onRegister={handleRegister}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <LoggedInRoute
                element={Login}
                onLogin={handleLogin}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route
            path="/movies"
            element={
            <ProtectedRoute 
              element={Movies}
              loggedIn={loggedIn}
              tokenChecked={tokenChecked}
              movies={filterMovies(
                movies,
                searchKeyword,
                isShortMoviesChecked
              )}
              isLoading={isLoading}
              hasError={hasError}
              inputValue={moviesInputValue}
              setInputValue={setMoviesInputValue}
              setIsShortChecked={setIsShortMoviesChecked}
              isShortChecked={isShortMoviesChecked}
              setSearchKeyword={setSearchKeyword}
              onMovieSave={handleLikeMovie}
              savedMovies={savedMovies}
            />}
          />
          <Route
            path="/saved-movies"
            element={
            <ProtectedRoute 
              element={SavedMovies}
              loggedIn={loggedIn}
              tokenChecked={tokenChecked}
              movies={filterMovies(
                savedMovies,
                savedMoviesSearchKeyword,
                isShortSavedMoviesChecked
              )}
              isLoading={isLoading}
              inputValue={savedMoviesInputValue}
              setInputValue={setSavedMoviesInputValue}
              setIsShortChecked={setIsShortSavedMoviesChecked}
              isShortChecked={isShortSavedMoviesChecked}
              setSearchKeyword={setSavedMoviesSearchKeyword}
              onMovieDelete={handleDeleteMovie}
            />}
          />
          <Route 
            path="/profile"
            element={
            <ProtectedRoute 
              element={Profile}
              onSignOut={signOut}
              tokenChecked={tokenChecked}
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

export default React.memo(App);