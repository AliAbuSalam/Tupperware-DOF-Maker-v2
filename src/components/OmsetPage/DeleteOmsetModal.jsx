import React, { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import parseToRp from '../../lib/parseToRp';
import { DELETE_OMSET_PLAN } from '../../gql/queries';
import { REMOVE_OMSET_PLAN } from '../../reducers/omsetReducers';
import { useDispatch } from 'react-redux';
import ErrorMessage from '../ErrorMessage';

const DeleteOmsetModal = ({ omset, open, setOpen, omsetId }) => {
  const [deleteOmset, { loading, error}] = useMutation(DELETE_OMSET_PLAN);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteOmset({ variables: { id: omsetId }}).then(({ data }) => {
      dispatch(REMOVE_OMSET_PLAN(data.deleteOmsetPlan));
      setOpen(false)
    }).catch(() => {});
  }

  const handleClose = () => {
    setErrorMessage(undefined);
    setOpen(false);
  }

  useEffect(() => {
    if(error && !loading){
      setErrorMessage(error.message);
    }
  }, [error, loading]);

  return(
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>Delete Omset</Modal.Header>
      <Modal.Content>
        <div>
          Delete Omset ?
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {omset.map(nameList => 
              <Table.Row key={nameList.name}>
                <Table.Cell>{nameList.name}</Table.Cell>
                <Table.Cell>{parseToRp(nameList.target)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <ErrorMessage 
          message={errorMessage}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          circular
          icon='close'
          onClick={handleClose}
        />
        <Button
          circular
          icon='trash alternate outline'
          color='red'
          onClick={handleDelete}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteOmsetModal;