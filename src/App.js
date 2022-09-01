import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';

const App = ()=> {
  return (

    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*">404 Not Found!</Route>
        </Routes>
      </Router>
  );
}

export default App;
