import React, { Fragment } from "react";
import MovieService from "../../services/MovieService";
import MovieForm from "./MovieForm";

const AddMovie = (props) => {
  
  const createMovie = (movie) => {
    MovieService.create(movie)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <MovieForm
        editMode={false}
        handleSubmit={createMovie}
      />
    </Fragment> 
  );
}

export default AddMovie;