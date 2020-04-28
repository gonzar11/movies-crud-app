import React, { useState, Fragment } from "react";
import MovieService from "../../services/MovieService";
import MovieForm from "./MovieForm";

const EditMovie = (props) => {
  const initialMovieState = {
    id: null,
    title: '',
    release_year: ''
  };
  
  // const [movie, setMovie] = useState(initialMovieState);
  // const [people, setPeople] = useState([]);
  const [message, setMessage] = useState('');

  const updateMovie = (movie) => {
    MovieService.update(movie.id, movie)
      .then(response => {
        console.log(response.data);
        setMessage("The movie was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <MovieForm
        editMode={true}
        handleSubmit={updateMovie}
        id={props.match.params.id}
      />
    </Fragment>
  );
}

export default EditMovie
