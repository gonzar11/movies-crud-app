import React from 'react';
import AddItemDropdown from './AddItemDropdown';

const ItemRoleList = props => {
  const { title } = props;
  const { itemType, items, addedItems } = props

  const handleAddClick = (itemType, itemId) => {
    if (itemId === -1) {
      return;
    }
    props.onAddClick(itemType, itemId)
  }

  const handleRemoveClick = (itemType, itemId) => {
    props.onRemoveClick(itemType, itemId)
  }

  return (
    <div className="list list--block">
      <div className="list--block_header">
        <h2 className="list--tile">{title}</h2>
        <AddItemDropdown
          items={items}
          itemType={itemType}
          onClick={handleAddClick}
        />
      </div>
      <ul>
        {addedItems && addedItems.map((item) =>(
          <li key={item.id} className="list--item">
            <span>{item.name}</span>
            <button 
              className="delete"
              onClick={() => handleRemoveClick(itemType, item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemRoleList;