import React, { useState, Fragment } from "react";

const AddItemDropdown = (props) => {
  const [value, setValue] = useState(-1);
  const items = props.items;
  const itemType = props.itemType;

  return (
    <Fragment>
      <select 
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      >
        <option value={-1}>Select</option>
        {items && items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
    </select>
    <button 
      className="create"
      onClick={() => props.onClick(itemType, value)}
    >
      Add
    </button>
    </Fragment>
  );
}

export default AddItemDropdown;