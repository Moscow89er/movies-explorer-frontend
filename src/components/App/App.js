import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation"; 
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import Footer from "../Footer/Footer";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
