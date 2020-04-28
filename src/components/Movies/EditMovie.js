import React, { useState, Fragment } from "react";
import MovieService from "../../services/MovieService";
import MovieForm from "./MovieForm";

const EditMovie = (props) => {
  const initialMovieState = {
    id: null,
    title: '',
    release_year: ''
  };
  
  const [successMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateMovie = (movie) => {
    MovieService.update(movie.id, movie)
      .then(response => {
        console.log(response.data);
        setSucessMessage('The movie was updated successfully!');
        setErrorMessage('');
      })
      .catch(e => {
        console.log(e);
        setErrorMessage(e.response.data.message);
        setSucessMessage('');
      });
  };

  return (
    <Fragment>
      <MovieForm
        editMode={true}
        handleSubmit={updateMovie}
        id={props.match.params.id}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Fragment>
  );
}

export default EditMovie
