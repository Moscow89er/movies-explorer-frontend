import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation"; 
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  const location = useLocation();

  const shouldRenderNavAndFooter = (pathname) => {
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

  const renderNavAndFooter = shouldRenderNavAndFooter(location.pathname);

  return (
    <div>
      {renderNavAndFooter && <Navigation />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {renderNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
