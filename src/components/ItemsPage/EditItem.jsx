import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { EDIT_ITEM } from '../../gql/queries';
import ErrorMessage from '../ErrorMessage';

const EditItem = ({ open, setOpen, item }) => {
  const initialItemState = {
    id: '',
    name: '',
    price: '',
    stock: ''
  }
  const [itemState, setItemState] = useState(initialItemState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mutate, { loading, error }] = useMutation(EDIT_ITEM);

  const handleChange = (varToChange, value) => {
    setItemState({
      ...itemState,
      [varToChange]: value
    });
  }

  const handleClose = () => {
    setErrorMessage(null);
    setOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: itemState.id,
      newName: itemState.name,
      newPrice: parseInt(itemState.price)
    };
    mutate({
      variables: newItem
    }).then(result => {
      setItemState(initialItemState);
      setOpen(false);
    }).catch(error => {
      setErrorMessage(error.message);
    });
  }

  useEffect(() => {
    if(error){
      console.log('error: ', error.message);
    }
  }, [error]);

  useEffect(() => {
    if(item.id){
      setItemState({
        id: item.id,
        name: item.name,
        price: item.price,
        stock: item.stock,
      });
    }
  }, [item])
  
  return(
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Edit Item</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} id='edit-item'>
          <Form.Input 
            label='Name'
            placeholder='Name'
            value={itemState.name}
            onChange={({ target }) => handleChange('name', target.value)}
          />
          <Form.Input 
            label='Price'
            placeholder='Price'
            value={itemState.price}
            onChange={({ target }) => handleChange('price', target.value)}
          />
        </Form>
        <ErrorMessage message={errorMessage}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='yellow' form='edit-item' type='submit' loading={loading} circular icon='edit'/>
      </Modal.Actions>
    </Modal>

  );
}

export default EditItem;