import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import { DELETE_USED_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';
import { DELETE_USED_STAR_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';


const DeleteModal = ({ item, itemType, openModal, setOpen }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if(itemType === 'STAR_ITEM'){
      dispatch(DELETE_USED_STAR_ITEM_DOF_EDIT(item));
    } else {
      dispatch(DELETE_USED_ITEM_DOF_EDIT(item));
    }
    setOpen(false);

  }

  return(
    <Modal
      open={openModal}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>Delete {itemType === 'STAR_ITEM'? <>Star Item</> : <>Item</>}</Modal.Header>
      <Modal.Content>Delete item {item.itemName} ?</Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color='red' onClick={handleDelete}>Delete</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;