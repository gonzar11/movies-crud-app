import React, { useState, useEffect } from 'react';
import PersonService from '../../services/PersonService';
import MovieService from '../../services/MovieService';
import ItemRoleList from '../ItemRoleList';

const PersonForm = (props) => {
  const initialPersonState = {
    id: null,
    first_name: '',
    last_name: '',
    aliases: '',
    acted_movies: [],
    directed_movies: [],
    produced_movies: []
  };
  const {editMode, id, successMessage, errorMessage} = props;
  const [person, setPerson] = useState(initialPersonState);
  const [movies, setMovies] = useState([]);
  const [formattedMovies, setFormattedMovies] = useState([]);

  const roleInMovies = [
    {name: 'acted_movies', title: 'Acted Movies'},
    {name: 'directed_movies', title: 'Directed Movies'},
    {name: 'produced_movies', title: 'Produced Movies' }
  ]

  const getPerson = id => {
    PersonService.get(id)
      .then(response => {
        setPerson(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getMovies = () => {
    MovieService.getAll()
      .then(response => {
        setMovies(response.data);
        setFormattedMovies(formatMovies(response.data))
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (editMode) {
      getPerson(id);
    }
    getMovies();
  },[id,editMode]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPerson({...person, [name]: value });
  };

  const removeMovie = (movieRole, movieId) => {
    const movies = person[movieRole].filter(movie => {return movie.id !== movieId}); 
    setPerson({...person, [movieRole]: movies });
  };

  const addMovie = (movieRole, movieId) => {
    const movie = person[movieRole].find(movie => movie.id == movieId);
    if (!movie) {
      const movie = movies.find(movie => movie.id == movieId );
      setPerson({...person, [movieRole]: [...person[movieRole], movie] });
    }    
  }

  const formatMovies = movies => {
    return movies.map(movie => {
      return {id: movie.id, name: movie.title
    }});
  }

  const handleSubmit = () => {
    const data = {
      id: person.id,
      first_name: person.first_name,
      last_name: person.last_name,
      aliases: person.aliases,
      acted_movies: person.acted_movies.map(movie => movie.id),
      directed_movies: person.directed_movies.map(movie => movie.id),
      produced_movies: person.produced_movies.map(movie => movie.id)
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
        <h1>{person.title}</h1>
      </div>
      <div className="list list--block">
        <h2 className="list--tile">Basic info</h2>
        <ul>
          <li className="list--item"><span>First Name</span>
            <input 
              className="list--input"
              type="text"
              name="first_name"
              value={person.first_name}
              onChange={handleInputChange}
            />
          </li>
          <li className="list--item"><span>Last Name</span>
            <input 
              className="list--input"
              type="text"
              name="last_name"
              value={person.last_name}
              onChange={handleInputChange}
            />
          </li>
          <li className="list--item"><span>Aliases</span>
            <input 
              className="list--input"
              type="text"
              name="aliases"
              value={person.aliases}
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>
      {
        roleInMovies.map(role => (
          <ItemRoleList
            addedItems={formatMovies(person[role.name])}
            items={formattedMovies}
            title={role.title}
            itemType={role.name}
            onAddClick={addMovie}
            onRemoveClick={removeMovie}
          />
        ))
      }
      <button className="create" onClick={handleSubmit}>Update</button>
    </div>
  );
}

export default PersonForm