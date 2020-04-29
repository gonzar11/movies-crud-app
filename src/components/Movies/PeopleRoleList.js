import React from "react";
import AddPersonDropdown from "./AddPersonDropdown";

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

  return (
    <div className="list list--block">
      <div className="list--block_header">
        <h2 className="list--tile">{title}</h2>
        <AddPersonDropdown 
          items={people}
          personRole={personRole}
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