import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import forceInputToNumber from '../../lib/forceInputToNumber';
import DateInput from '../DateInput';
import { ADD_ORDER, REDUCE_ORDER } from '../../gql/queries';
import ErrorMessage from '../ErrorMessage';

const ChangeStock = ({ item, open, setOpen, action }) => {
  const [value, setValue] = useState('');
  const [actionState, setActionState] = useState('ADD');
  const [errorMessage, setErrorMessage] = useState(null);
  const [date, setDate] = useState({
    year: '',
    month: '',
    week: ''
  });
  const [addOrder, resultOfAdd] = useMutation(ADD_ORDER);
  const [reduceOrder, resultOfReduce] = useMutation(REDUCE_ORDER);

  useEffect(() => {
    setActionState(action);
  }, [action]);
  
  const handleAddOrder = () => {
    const parsedYear = parseInt(date.year);
    addOrder({
      variables: {
        id: item.id,
        date: {
          ...date,
          year: parsedYear
        },
        numberOfItems: value
      }
    })
      .then(closeModal)
      .catch(error => setErrorMessage(error.message));
  };

  const handleReduceOrder = () => {
    reduceOrder({
      variables: {
        id: item.id,
        numberOfItems: value
      }
    })
      .then(closeModal)
      .catch(error => setErrorMessage(error.message));
  };

  const closeModal = () => {
    setValue('');
    setErrorMessage(null);
    setOpen(false);
  }

  return(
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{actionState === 'ADD' ? `Add order for ${item.name}` : `Reduce order for ${item.name}`}</Modal.Header>
      <Modal.Content>
        <Form>
          <Input
            label='Number of items'
            value={value}
            onChange={({ target }) => setValue(parseInt(forceInputToNumber(target.value)))}
          />
          {actionState === 'ADD' 
            ? <DateInput date={date} setDate={setDate}/>
            : <></>
          }
        </Form>
        <ErrorMessage message={errorMessage}/>
      </Modal.Content>
      <Modal.Actions>
        {actionState === 'ADD'
          ? <Button circular icon='add' onClick={handleAddOrder} loading={resultOfAdd.loading} color='green'/>
          : <Button circular icon='minus' onClick={handleReduceOrder} loading={resultOfReduce.loading} color='orange'/>
        }
      </Modal.Actions>
    </Modal>
  );
};

export default ChangeStock;