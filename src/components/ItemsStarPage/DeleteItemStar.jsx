import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { DELETE_ITEM_STAR } from '../../gql/queries';
import { REMOVE_ITEM_STAR } from '../../reducers/itemStarReducers';
import ErrorMessage from '../ErrorMessage';

const DeleteItemStar = ({ activeItem, setActiveItem, open, setOpen }) => {
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM_STAR);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteItem({
      variables: {
        id: activeItem.id
      }
    }).then(() => {
      dispatch(REMOVE_ITEM_STAR(activeItem.id));
      handleClose();
    }).catch(error => setError(error.message));
  }

  const handleClose = () => {
    setActiveItem(undefined);
    setError(undefined);
    setOpen(false);
  }

  return(
    <Modal
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
    >
      <Modal.Header>Delete Star Item</Modal.Header>
      <Modal.Content>
        Delete Star Item {activeItem?.name}?
        <ErrorMessage message={error}/>
      </Modal.Content>
      <Modal.Actions>
        <Button
          circular
          icon='delete'
          color='red'
          loading={loading}
          onClick={handleDelete}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteItemStar;