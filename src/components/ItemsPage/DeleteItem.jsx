import React, { useState } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { DELETE_ITEM } from '../../gql/queries';
import { REMOVE_ITEM } from '../../reducers/itemReducers';

const DeleteItem = ({ open, setOpen, item}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [mutate, { loading }] = useMutation(DELETE_ITEM);
  const dispatch = useDispatch();

  const handleClick = () => {
    mutate({
      variables: {
        id: item.id
      }
    }).then(({ data }) => {
      if(data.deleteItem.status === 'success'){
        dispatch(REMOVE_ITEM(item.id));
        setOpen(false);
      } else {
        setErrorMessage(data.deleteItem.errorMessage);
      }
    }).catch(error => setErrorMessage(error.message));
  };

  const handleClose = () => {
    setErrorMessage('');
    setOpen(false);
  }

  return(
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Delete item</Modal.Header>
      <Modal.Content>
        Delete item {item?.name}?
      </Modal.Content>
      <Message hidden={!errorMessage} error style={{ textAlign: 'center' }}>
        <Message.Header>ERROR</Message.Header>
        {errorMessage}
      </Message>
      <Modal.Actions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button loading={loading} color='red'
          onClick={handleClick}
        >
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteItem;