import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import Group from './Group';
import { DELETE_GROUP } from '../../gql/queries';
import { REMOVE_GROUP } from '../../reducers/groupReducers';
import ErrorMessage from '../ErrorMessage';

const DeleteGroupForm = ({ group, setGroup }) => {
  const [deleteGroup, { loading, error }] = useMutation(DELETE_GROUP);
  const dispatch = useDispatch();

  const handleDeleteGroup = () => {
    deleteGroup({ variables: {
      id: group.id
    }}).then(({ data }) => {
      dispatch(REMOVE_GROUP(data.deleteGroup.groupId))
      handleClose();
    }).catch(error => console.log(error.message));
  };

  const handleClose = () => {
    setGroup(null);
  };

  return(
    <Modal
      open={group && true}
      onClose={handleClose}
    >
      <Modal.Header>Delete Group</Modal.Header>
      <Modal.Content>
        <Group group={group}/>
        <br />
        <b>
          Delete this group?
        </b>
      </Modal.Content>
      <ErrorMessage message={error?.message}/>
      <Modal.Actions>
        <Button icon='close' circular onClick={handleClose}/>
        <Button icon='trash alternate outline' circular color='red' onClick={handleDeleteGroup} loading={loading}/>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteGroupForm;