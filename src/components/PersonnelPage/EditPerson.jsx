import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import positionObjects from '../../lib/positionObject';
import { EDIT_PERSON } from '../../gql/queries';
import { EDIT_PERSON as EDIT_PERSON_STATE } from '../../reducers/personReducers';
import ErrorMessage from '../ErrorMessage';

const EditPerson = ({ open, setOpen, activePerson, setActivePerson }) => {
  const [name, setName] = useState('');
  const [consultantId, setConsultantId] = useState('');
  const [position, setPosition] = useState('');
  const [upline, setUpline] = useState('');
  const [error, setError] = useState('');
  const [mutate, { loading }]= useMutation(EDIT_PERSON);
  const dispatch = useDispatch();
  const personnelList = useSelector(state => state.people.filter(person => {
    if(activePerson){
      return person.id !== activePerson.id
    }
    return true;
  }).map(person => {
    return {
      key: person.id,
      value: person.id,
      text: person.name
    };
  }));

  const handleClose = () => {
    setError('');
    setActivePerson(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    const editedPerson = {
      id: activePerson.id,
      ...(name !== activePerson.name) && { name },
      ...(consultantId !== activePerson.consultantId) && { consultantId },
      ...(position !== activePerson.position) && { position },
      ...(upline !== activePerson.upline) && { upline }
    };
    console.log('editedPerson: ', editedPerson);
    console.log('mutating data....');
    mutate({
      variables: editedPerson
    }).then(({ data }) => {
      console.log('dispatching data....');
      dispatch(EDIT_PERSON_STATE(data));
      console.log('closing modal....');
      handleClose();
      console.log('modal closed....');
    }).catch(error => setError(error));
  };

  useEffect(() => {
    if(activePerson){
      setName(activePerson.name);
      setConsultantId(activePerson.consultantId);
      setPosition(activePerson.position);
      setUpline(activePerson.upline?.id);
    }
  }, [activePerson]);

  return(
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Edit person</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input 
            label='Name'
            placeholder='Name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Input 
            label='Consultant Id'
            placeholder='Consultant Id'
            value={consultantId}
            onChange={({ target }) => setConsultantId(target.value)}
          />
          <Form.Dropdown 
            label='Position'
            placeholder='Position'
            search
            selection
            value={position}
            options={positionObjects}
            onChange={(_, data) => setPosition(data.value)}
          />
          <Form.Dropdown 
            label='Upline'
            placeholder='Upline'
            search
            selection
            clearable
            value={upline}
            options={personnelList}
            onChange={(_, data) => setUpline(data.value)}
          />
        </Form>
        <ErrorMessage message={error?.message}/>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon='edit'
          color='yellow'
          circular
          loading={loading}
          disabled={!(name && consultantId && position)}
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditPerson;