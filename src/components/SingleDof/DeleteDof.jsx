import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import monthValueToText from '../../lib/monthValueToText';
import { DELETE_DOF } from '../../gql/queries';
import { REMOVE_DOF } from '../../reducers/dofReducers';
import ErrorMessage from '../ErrorMessage';

const DeleteDof = ({ dof, style, weekIndex }) => {
  const [open, setOpen] = useState(false);
  const [deleteDof, { loading, error}] = useMutation(DELETE_DOF);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteDof({ variables: { id: dof.id }})
      .then(({ data }) => {
        dispatch(REMOVE_DOF({
          dof: data.deleteDof.dof,
          weekIndex
        }));
        history.push('..');
      })
      .catch(error => {
        console.error(error);
      })
  };

  return(
    <Modal
      open={open}
      onClose={handleClose}
      trigger={<Button style={style} onClick={() => setOpen(true)}>Delete</Button>}
    >
      <Modal.Header>Delete Dof</Modal.Header>
      <Modal.Content>
        Delete dof? <br/>
        Owner: <b>{dof?.owner?.name} <br/></b>
        Date: <b>{dof?.date.year} {monthValueToText(dof?.date?.month)} week {dof?.date?.week}</b>
      </Modal.Content>
      <ErrorMessage message={error?.message}/>
      <Modal.Actions>
        <Button icon='cancel' circular onClick={handleClose}/>
        <Button icon='trash alternate outline' circular color='red' onClick={handleDelete} loading={loading}/>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteDof;