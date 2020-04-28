import React, { useState } from "react";
import MovieService from "../../services/MovieService";

const AddMovie = (props) => {
  const initialMovieState = {
    title: '',
    releaseYear: '',
    directors: [],
    casting: [],
    producers: []
  };
  const [movie, setMovie] = useState(initialMovieState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const saveMovie = () => {
    var data = {
      title: movie.title,
      release_year: movie.releaseYear
    };

    MovieService.create(data)
      .then(response => {
        setMovie({
          id: response.data.id,
          title: response.data.title,
          release_year: response.data.release_year,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const redirectToMovies = () => {
    props.history.push('/home');
}

  const newTutorial = () => {
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>A movie was added</h4>
          <button className="btn btn-success" onClick={redirectToMovies}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              required
              value={movie.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Release year</label>
            <input
              type="number"
              name="releaseYear"
              className="form-control"
              required
              value={movie.release_year}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveMovie} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMovie;