import React, { useState, Fragment } from 'react';
import MovieService from '../../services/MovieService';
import MovieForm from './MovieForm';

const AddMovie = (props) => {
  const [successMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const createMovie = (movie) => {
    MovieService.create(movie)
      .then(response => {
        console.log(response.data);
        setSucessMessage('The movie was updated successfully!');
        setErrorMessage('')
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
        editMode={false}
        handleSubmit={createMovie}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Fragment> 
  );
}

export default AddMovie;