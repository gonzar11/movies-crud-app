import React, { useState, Fragment } from 'react';
import PersonService from '../../services/PersonService';
import PersonForm from './PersonForm';

const EditPerson = (props) => {
  const [successMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updatePerson = (person) => {
    PersonService.update(person.id, person)
      .then(response => {
        console.log(response.data);
        setSucessMessage('The person was updated successfully!');
        setErrorMessage('');
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
        editMode={true}
        handleSubmit={updatePerson}
        id={props.match.params.id}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Fragment>
  );
}

export default EditPerson
