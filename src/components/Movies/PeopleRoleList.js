import React from 'react';
import AddItemDropdown from '../AddItemDropdown';

const PeopleRoleList = props => {
  const {title, people, personRole, movie} = props;

  const handleAddClick = (personRole, personId) => {
    if (personId === -1) {
      return;
    }
    props.onAddClick(personRole, personId)
  }

  const handleRemoveClick = (personRole, personId) => {
    props.onRemoveClick(personRole, personId)
  }

  const formatPeople = people => {
    return people.map(person => {
      return {id: person.id, name: `${person.first_name} ${person.last_name}`
    }});
  }

  return (
    <div className="list list--block">
      <div className="list--block_header">
        <h2 className="list--tile">{title}</h2>
        <AddItemDropdown
          items={formatPeople(people)}
          itemType={personRole}
          onClick={handleAddClick}
        />
      </div>
      <ul>
        {movie[personRole] && movie[personRole].map((person) =>(
          <li key={person.id} className="list--item">
            <span>{person.first_name} {person.last_name}</span>
            <button 
              className="delete"
              onClick={() => handleRemoveClick(personRole, person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleRoleList;
