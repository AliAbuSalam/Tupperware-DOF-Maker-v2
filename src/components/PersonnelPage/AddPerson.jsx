import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import positionObjects from '../../lib/positionObject';
import ErrorMessage from '../ErrorMessage';
import { CREATE_PERSON } from '../../gql/queries';
import { ADD_PERSON } from '../../reducers/personReducers';
import PositionDropdown from './PositionDropdown';

const AddPerson = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [consultantId, setConsultantId] = useState('');
  const [position, setPosition] = useState(undefined);
  const [upline, setUpline] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [mutate, { loading, error }] = useMutation(CREATE_PERSON);
  const dispatch = useDispatch();
  const personnelList = useSelector(state => state.people.map(person => {
    return {
      key: person.id,
      value: person.id,
      text: person.name
    };
  }));

  const handleClose = () => {
    setName('');
    setConsultantId('');
    setPosition(undefined);
    setUpline(undefined);
    setErrorMessage('');
    setOpen(false);
  };

  const handlePositionChange = (_, data) => {
    setPosition(data.value);
  };

  const handleUplineChange = (_, data) => {
    setUpline(data.value);
  };

  const handleSubmit = () => {
    const personObject = {
      name,
      consultantId,
      position,
      upline: upline ? upline : undefined
    }
    mutate({
      variables: personObject
    }).then(result => {
      console.log('data: ', result.data.createPerson);
      dispatch(ADD_PERSON(result.data.createPerson));
      handleClose();
    }).catch(error => console.log(error.message));
  };

  useEffect(() => {
    setErrorMessage(error?.message);
  }, [error]);

  return(
    <Modal 
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='green' style={{ marginLeft: '3rem' }}>Add Person </Button>}
    >
      <Modal.Header>Add Person</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input 
            label='name'
            placeholder='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Input 
            label='consultantId'
            placeholder='consultant id'
            value={consultantId}
            onChange={({ target }) => setConsultantId(target.value)}
          />
          <PositionDropdown
            onChange={handlePositionChange}
            clearable={true}
          />
          <Form.Dropdown 
            label='Upline'
            placeholder='Upline'
            search
            selection
            clearable
            options={personnelList}
            onChange={handleUplineChange}
          />
        </Form>
        <ErrorMessage message={errorMessage}/>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          icon='plus'
          circular
          color='green'
          disabled={!(name && consultantId && position)}
          loading={loading}
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddPerson;