import React, { useState, useEffect } from 'react';
import PersonService from '../../services/PersonService';
import { Link, useRouteMatch } from 'react-router-dom';

const PeopleList = () => {
  const { url } = useRouteMatch();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    PersonService.getAll()
      .then(response => {
        setPeople(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePerson = (personId) => {
    PersonService.remove(personId)
      .then(response => {
        console.log(response.data);
        getPeople()
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header--left">
          <h1>People</h1>
          <Link to={`${url}/add`} >
            <button className="create">Create</button>
          </Link>
        </div>
      </div>
      <ul className="list">
        {people && people.map((person, index) => (
          <li className="list--item" key={person.id}>
            <span>{person.first_name} {person.last_name}</span>
            <div className=".list--item_buttons">
              <Link to={`${url}/${person.id}/edit`}>
                <button className="edit">Edit</button>
              </Link>
              <button className="delete" onClick={() => deletePerson(person.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
