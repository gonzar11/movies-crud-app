import React, { useState, useEffect } from 'react';
import MovieService from '../../services/MovieService';
import PersonService from '../../services/PersonService';
import ItemRoleList from '../ItemRoleList';

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
  const [formattedPeople, setFormattedPeople] = useState([]);

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
        setFormattedPeople(formatPeople(response.data));
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

  const removePerson = (personRole, personId) => {
    const items = movie[personRole].filter(person => {return person.id !== personId});
    setMovie({...movie, [personRole]: items });
  };

  const addPerson = (personRole, personId) => {
    const item = movie[personRole].find(person => person.id == personId);
    if (!item) {
      const person = people.find(person => person.id == personId );
      setMovie({...movie, [personRole]: [...movie[personRole], person] });
    }    
  };

  const formatPeople = people => {
    return people.map(person => {
      return {id: person.id, name: `${person.first_name} ${person.last_name}`
    }});
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
      <ItemRoleList
        addedItems={formatPeople(movie.casting)}
        items={formattedPeople}
        title="Casting"
        itemType="casting"
        onAddClick={addPerson}
        onRemoveClick={removePerson}
      />
      <ItemRoleList
        addedItems={formatPeople(movie.directors)}
        items={formattedPeople}
        title="Directors"
        itemType="directors"
        onAddClick={addPerson}
        onRemoveClick={removePerson}
      />
      <ItemRoleList
        addedItems={formatPeople(movie.producers)}
        items={formattedPeople}
        title="Producers"
        itemType="producers"
        onAddClick={addPerson}
        onRemoveClick={removePerson}
      />
      <button className="create" onClick={handleSubmit}>Update</button>
    </div>
  );
}

export default MovieForm
