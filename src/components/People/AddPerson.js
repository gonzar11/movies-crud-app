import React, { useState, Fragment } from 'react';
import PersonService from '../../services/PersonService';
import PersonForm from './PersonForm';

const AddPerson = (props) => {
  const [successMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const createPerson = (person) => {
    PersonService.create(person)
      .then(response => {
        console.log(response.data);
        setSucessMessage('The person was created successfully!');
        setErrorMessage('')
      })
      .catch(e => {
        console.log(e);
        setErrorMessage(e.response.data.message);
        setSucessMessage('');
      });
  };

  return (
    <Fragment>
      <PersonForm
        editMode={false}
        handleSubmit={createPerson}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Fragment> 
  );
}

export default AddPerson;
