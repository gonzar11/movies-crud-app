import React, { useState, useEffect } from "react";
import MovieService from "../../services/MovieService";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    MovieService.getAll()
      .then(response => {
        setMovies(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteMovie = (movieId) => {
    MovieService.remove(movieId)
      .then(response => {
        console.log(response.data);
        getMovies()
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header--left">
          <h1>Movies</h1>
          <Link to={"/movies/add"} >
            <button className="create">Create</button>
          </Link>
        </div>
      </div>
      <ul className="list">
        {movies && movies.map((movie, index) =>(
          <li className="list--item" key={movie.id}>
            <span>{movie.title} - release year: {movie.release_year}</span>
            <Link to={`movies/${movie.id}/edit`}>
              <button className="edit">Edit</button>
            </Link>
            <button className="delete" onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;