import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import forceInputToNumber from '../../lib/forceInputToNumber';
import { ADD_ITEM } from '../../gql/queries';
import { ADD_ITEM as ADD_ITEM_TO_STORE } from '../../reducers/itemReducers'; 
import DateInput from '../DateInput';

const AddItem = (props) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [addItem, { loading, error}] = useMutation(ADD_ITEM);
  const [date, setDate] = useState({
    year: '',
    month: '',
    week: ''
  });
  const [dateValidity, setDateValidity] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const parsedItemPrice = parseInt(itemPrice);
    const parsedInitialAmount = parseInt(initialAmount);
    const parsedDate = {
      ...date,
      year: parseInt(date.year)
    };
    addItem({
      variables: {
        name: itemName,
        price: parsedItemPrice,
        initialAmount: parsedInitialAmount,
        date: parsedDate
      }
    }).then(({ data }) => {
      dispatch(ADD_ITEM_TO_STORE(data.createItem));
      setItemName('');
      setItemPrice('');
      setInitialAmount('');
      setDate({ ...date, year: ''});
      setOpen(false);
    }).catch(() => {});
  };

  useEffect(() => {
    const isYearValid = date.year === '' ? false : true;
    const isMonthValid = date.month === '' ? false: true;
    const isWeekValid = date.week === '' ? false: true;
    setDateValidity(isYearValid && isMonthValid && isWeekValid);
  }, [date])

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
          <DateInput 
            date={date}
            setDate={setDate}
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
        <Button onClick={handleSubmit} disabled={!itemName || !itemPrice || !dateValidity} loading={loading}>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddItem;