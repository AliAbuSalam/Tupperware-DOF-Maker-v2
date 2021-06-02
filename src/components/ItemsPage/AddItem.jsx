import React, { useState } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import forceInputToNumber from '../../lib/forceInputToNumber';
import { ADD_ITEM } from '../../gql/queries';
import { ADD_ITEM as ADD_ITEM_TO_STORE } from '../../reducers/itemReducers'; 

const AddItem = (props) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [addItem, { loading, error}] = useMutation(ADD_ITEM);
  const dispatch = useDispatch();


  const handleSubmit = () => {
    const parsedItemPrice = parseInt(itemPrice);
    const parsedInitialAmount = parseInt(initialAmount);
    addItem({
      variables: {
        name: itemName,
        price: parsedItemPrice,
        initialAmount: parsedInitialAmount
      }
    }).then(({ data }) => {
      console.log('result.data.createItem: ', data.createItem);
      dispatch(ADD_ITEM_TO_STORE(data.createItem));
      setItemName('');
      setItemPrice('');
      setInitialAmount('');
      setOpen(false);
    }).catch(() => {});
  };

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={props.style} color='green'>Add item</Button>}
      {...props}
    >
      <Modal.Header>Add an item</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input 
            label='Name' 
            placeholder='Name' 
            value={itemName} 
            onChange={({ target }) => setItemName(target.value)}
          />
          <Form.Input 
            label='Price'
            placeholder='Price'
            value={itemPrice}
            onChange={({ target }) => setItemPrice(forceInputToNumber(target.value))}
          />
          <Form.Input 
            label='Stock'
            placeholder='Stock'
            value={initialAmount}
            onChange={({ target }) => setInitialAmount(forceInputToNumber(target.value))}
          />
        </Form>
      </Modal.Content>
      <Message error={true} hidden={!error} style={{ textAlign: 'center' }}>
        <Message.Header>ERROR</Message.Header>
        {error?.message}
      </Message>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!itemName || !itemPrice} loading={loading}>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddItem;