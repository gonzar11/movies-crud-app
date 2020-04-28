import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddMovie from "./components/Movies/AddMovie";
import EditMovie from "./components/Movies/EditMovie";
import MoviesList from "./components/Movies/MoviesList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            MovieApp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/movies/add"} className="nav-link">
                Add Movie
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList} />
            <Route exact path="/movies/add" component={AddMovie} />
            <Route path="/movies/:id/edit" component={EditMovie} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
