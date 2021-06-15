import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { REMOVE_PERSON } from '../../reducers/personReducers';
import { DELETE_PERSON } from '../../gql/queries';
import ErrorMessage from '../ErrorMessage';

const DeletePerson = ({ open, setOpen, activePerson, setActivePerson }) => {
  const [error, setError] = useState('');
  const [mutate, { loading }] = useMutation(DELETE_PERSON);
  const dispatch = useDispatch();

  const handleSubmit = (id) => {
    mutate({
      variables: {
        id
      }
    }).then(() =>{
      dispatch(REMOVE_PERSON(id));
      handleClose();
    }).catch(error => {
      setError(error.message);
    })
  };

  const handleClose = () => {
    setError('');
    setActivePerson(null);
    setOpen(false);
  };

  return(
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Delete personnel</Modal.Header>
      <Modal.Content>
        Delete {activePerson?.name}?
      </Modal.Content>
      <ErrorMessage message={error}/>
      <Modal.Actions>
        <Button 
          icon='cancel'
          circular
          onClick={handleClose}
        />
        <Button 
          icon='trash alternate outline'
          circular
          color='red'
          loading={loading}
          onClick={() => handleSubmit(activePerson.id)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeletePerson;