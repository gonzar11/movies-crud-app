import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './components/Movies/MoviesList';
import AddMovie from './components/Movies/AddMovie';
import EditMovie from './components/Movies/EditMovie';
import PeopleList from './components/People/PeopleList';
import AddPerson from './components/People/AddPerson';
import EditPerson from './components/People/EditPerson';


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
              <Link to={"/people"} className="nav-link">
                People
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList} />
            <Route exact path="/movies/add" component={AddMovie} />
            <Route path="/movies/:id/edit" component={EditMovie} />
            <Route exact path={"/people"} component={PeopleList} />
            <Route exact path="/people/add" component={AddPerson} />
            <Route path="/people/:id/edit" component={EditPerson} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
