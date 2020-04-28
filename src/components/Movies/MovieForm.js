import React, { useState, useEffect } from "react";
import MovieService from "../../services/MovieService";
import PersonService from "../../services/PersonService";
import AddPersonDropdown from "./AddPersonDropdown";

const MovieForm = (props) => {
  const initialMovieState = {
    id: null,
    title: '',
    release_year: '',
    casting: [],
    directors: [],
    producers: []
  };
  const {editMode, id, successMessage, errorMessage} = props;
  const [movie, setMovie] = useState(initialMovieState);
  const [people, setPeople] = useState([]);

  const getMovie = id => {
    MovieService.get(id)
      .then(response => {
        setMovie(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getPeople = () => {
    PersonService.getAll()
      .then(response => {
        setPeople(response.data);
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (editMode) {
      getMovie(id);
    }
    getPeople();
  },[id,editMode]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMovie({...movie, [name]: value });
  };

  const removePerson = (personRol, personId) => {
    const items = movie[personRol].filter(person => {return person.id !== personId}); 
    setMovie({...movie, [personRol]: items });
  };

  const addPerson = (itemType, itemId) => {
    console.log(itemType);
    console.log(itemId);
    if (itemId === -1)
      return;

    const item = movie[itemType].find(item => item.id == itemId);
    if (!item) {
      const person = people.find(person => person.id == itemId );
      setMovie({...movie, [itemType]: [...movie[itemType], person] });
    }    
  }

  const handleSubmit = () => {
    const data = {
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      casting: movie.casting.map(actor => actor.id),
      directors: movie.directors.map(director => director.id),
      producers: movie.producers.map(producer => producer.id)
    };
    props.handleSubmit(data);
  };

  return (
    <div className="wrapper">
      {/* TODO: Refactor this alert messages in one component AlertMessage */}
      {successMessage &&
        <div className="alert alert-success mt-2" role="alert">
          {successMessage}
        </div>
      }
      {errorMessage &&
        <div className="alert alert-danger mt-2" role="alert">
          {errorMessage}
        </div>
      }
      <div className="header">
        <h1>{movie.title}</h1>
      </div>
      <div className="list list--block">
        <h2 className="list--tile">Basic info</h2>
        <ul>
          <li className="list--item"><span>Title</span>
            <input 
              className="list--input"
              type="text"
              name="title"
              value={movie.title}
              onChange={handleInputChange}/>
          </li>
          <li className="list--item"><span>Year</span>
            <input
              className="list--input"
              type="text"
              name="release_year"
              value={movie.release_year}
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>
      <div className="list list--block">
        <div className="list--block_header">
          <h2 className="list--tile">Actors</h2>
          <AddPersonDropdown 
            items={people}
            personRole="casting"
            onClick={addPerson}
          />
        </div>
        <ul>
          {movie.casting && movie.casting.map((actor) =>(
            <li key={actor.id} className="list--item">
              <span>{actor.first_name} {actor.last_name}</span>
              <button 
                className="delete"
                onClick={() => removePerson('casting', actor.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="list list--block">
        <div className="list--block_header">
          <h2 className="list--tile">Directors</h2>
          <AddPersonDropdown 
            items={people}
            personRole="directors"
            onClick={addPerson}
          />
        </div>
        <ul>
          {movie.directors && movie.directors.map((director) =>(
            <li key={director.id} className="list--item">
              <span>{director.first_name} {director.last_name}</span>
              <button 
                className="delete"
                onClick={() => removePerson('directors', director.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="list list--block">
        <div className="list--block_header">
          <h2 className="list--tile">Producers</h2>
          <AddPersonDropdown 
            items={people}
            personRole="producers"
            onClick={addPerson}
          />
        </div>
        <ul>
          {movie.producers && movie.producers.map((producer) =>(
            <li key={producer.id} className="list--item">
              <span>{producer.first_name} {producer.last_name}</span>
              <button 
                className="delete" 
                onClick={() => removePerson('producers', producer.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="create" onClick={handleSubmit}>Update</button>
      
      
    </div>
  );
}

export default MovieForm