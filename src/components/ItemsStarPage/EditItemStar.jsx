import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import forceInputToNumber from '../../lib/forceInputToNumber';
import { EDIT_ITEM_STAR } from '../../gql/queries';
import ErrorMessage from '../ErrorMessage';

const EditItemStar = ({ activeItem, setActiveItem, open, setOpen }) => {
  const initialItemState = {
    name: '',
    starCost: ''
  };
  const [item, setItem] = useState(initialItemState);
  const [error, setError] = useState();
  const [edit, { loading }] = useMutation(EDIT_ITEM_STAR);
  
  const handleClose = () => {
    setItem(initialItemState);
    setActiveItem(undefined);
    setOpen(false);
  };

  const handleChange = (varToChange, value) => {
    let processedValue = value;
    if(varToChange === 'starCost'){
      processedValue = parseInt(processedValue);
    }
    setItem({
      ...item,
      [varToChange]: processedValue
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    edit({
      variables: {
        id: item.id,
        name: item.name,
        starCost: item.starCost
      }
    }).then(() => {
      handleClose();
    }).catch(error => setError(error.message));
  }

  useEffect(() => {
    if(activeItem){
      setItem(activeItem);
    }
  }, [activeItem])

  return(
    <Modal 
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
    >
      <Modal.Header>Edit Star Item</Modal.Header>
      <Modal.Content>
        <Form 
          id='edit-item-star'
          onSubmit={handleSubmit}
        >
          <Form.Input 
            label='Name'
            placeholder='name'
            value={item?.name}
            onChange={({ target }) => handleChange('name', target.value)}
          />
          <Form.Input 
            label='Star Cost'
            placeholder='star cost'
            value={item?.starCost}
            onChange={({ target }) => handleChange('starCost', forceInputToNumber(target.value))}
          />
        </Form>
        <ErrorMessage message={error}/>
      </Modal.Content>
      <Modal.Actions>
        <Button circular color='yellow' icon='edit' form='edit-item-star' type='submit' loading={loading}/>
      </Modal.Actions>
    </Modal>
  );
};

export default EditItemStar;