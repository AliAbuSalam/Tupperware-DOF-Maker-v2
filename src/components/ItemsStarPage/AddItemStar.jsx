import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import forceInputToNumber from '../../lib/forceInputToNumber';
import { ADD_ITEM_STAR } from '../../gql/queries';
import { ADD_ITEM_STAR as ADD_ITEM_STAR_STATE } from '../../reducers/itemStarReducers';
import ErrorMessage from '../ErrorMessage';

const AddItemStar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [starCost, setStarCost] = useState('');
  const [error, setError] = useState('');
  const [addItemStar, { loading, error: errorMutation }] = useMutation(ADD_ITEM_STAR);
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    if(!starCost || !name){
      return;
    }
    addItemStar({
      variables: {
        name,
        starCost: parseInt(starCost)
      }
    }).then(({ data }) => {
      console.log('data: ', data);
      dispatch(ADD_ITEM_STAR_STATE(data.createItemStar));
      handleClose();
    }).catch(error => console.log('error: ', error.message));
  };

  const handleClose = () => {
    setName('');
    setStarCost('');
    setError('');
    setOpen(false);
  }

  useEffect(() => {
    if(errorMutation){
      setError(errorMutation.message);
    }
  }, [errorMutation])

  return(
    <Modal
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      open={open}
      trigger={<Button color='green' style={{ marginLeft: '3rem' }}>Add Star Item</Button>}
    >
      <Modal.Header>Add Star Item</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input 
            label='Name'
            placeholder='Name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Input 
            label='Star Cost'
            placeholder='star cost'
            value={starCost}
            onChange={({ target }) => setStarCost(forceInputToNumber(target.value))}
          />
        </Form>
        <ErrorMessage message={error}/>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          circular 
          icon='plus' 
          color='green' 
          onClick={handleSubmit}
          disabled={!name || !starCost}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddItemStar;