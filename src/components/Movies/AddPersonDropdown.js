import React, { useState, Fragment } from "react";

const AddPersonDropDown = (props) => {
  const [value, setValue] = useState(-1);
  const items = props.items;
  const personRole = props.personRole;

  return (
    <Fragment>
      <select 
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      >
        <option value={-1}>Select a person</option>
        {items && items.map(item => (
          <option key={item.id} value={item.id}>
            {item.first_name} {item.last_name}
          </option>
        ))}
    </select>
    <button 
      className="create"
      onClick={() => props.onClick(personRole, value)}
    >
      Add
    </button>
    </Fragment>
  );
}

export default AddPersonDropDown;