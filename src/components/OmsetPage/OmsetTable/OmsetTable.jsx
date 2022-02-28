import React, { useState, useEffect } from 'react';
import { Table, Button  } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import monthToWeekParser from '../../../lib/monthToWeekParser';
import parseToRp from '../../../lib/parseToRp';
import OmsetTableRow, { calculateTotalPrice } from './OmsetTableRow';
import DeleteIcon from '../../DeleteIcon';
import { EDIT_OMSET_PLAN } from '../../../gql/queries';
import forceInputToNumber from '../../../lib/forceInputToNumber';
import ErrorMessage from '../../ErrorMessage';
import { EDIT_OMSET_PLAN as EDIT_OMSET_PLAN_REDUCER } from '../../../reducers/omsetReducers';
import DeleteOmsetModal from '../DeleteOmsetModal';

const OmsetTable = ({ omset, dofs, editMode, setOmsetToEdit }) => {
  const weekArray = monthToWeekParser(omset.date.month);
  const group = omset.individualTarget.map(person => ({ id: person.personId, name: person.name }));
  const [editedOmset, setEditedOmset] = useState(omset.individualTarget.map(
    ({ personId, target}) => ({ personId, target })
  ));
  const [saveOmset, { data, loading, error }] = useMutation(EDIT_OMSET_PLAN);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const changeTarget = (personId) => (_, data) => {
    const newOmset = editedOmset.map(oldOmset => oldOmset.personId === personId ? 
      { 
        ...oldOmset, 
        target: data.value !== '' ? parseInt(forceInputToNumber(data.value)): 0
      } 
      : oldOmset
    )
    setEditedOmset(newOmset);
  }

  const handleSave = () => {
    saveOmset({ variables: {
      id: omset.id,
      individualTarget: editedOmset
    }}).then(() => {
      setOmsetToEdit(null);
    }).catch(error => console.log(error));
  };

  const handleCancel = () => {
    setOmsetToEdit(null);
  }

  useEffect(() => {
    if(data && !loading){
      dispatch(EDIT_OMSET_PLAN_REDUCER(data.editOmsetPlan))
    }
  }, [data, loading, dispatch]);

  return(
    <div>
      <Table onClick={() => setOmsetToEdit(omset.id)}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {weekArray.map(week => <Table.HeaderCell key={`${omset.id} ${week}`}>week {week}</Table.HeaderCell>)}
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>
              Target
              {
                !editMode ? 
                <></> :
                <DeleteIcon
                  circular
                  defaultStyle={styles.deleteButton}
                  onHoverStyle={styles.deleteButtonHover}
                  name='trash alternate outline'
                  onClick={() => setOpenDeleteModal(true)}
                />
              }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {group.filter(member => member.isLeader).map(person => 
            <OmsetTableRow
              key={person.personId}
              person={person}
              weekArray={weekArray}
              omset={omset}
              dofs={dofs?.filter(dof => 
                dof.owner.name === person.name
                && dof.date.year === omset.date.year  
              )}
            />
          )}
          {group.filter(member => !member.isLeader).map(person =>
            <OmsetTableRow
              key={person.personId}
              person={person}
              weekArray={weekArray}
              omset={omset}
              dofs={dofs.filter(dof =>
                dof.owner.name === person.name
                && dof.date.year === omset.date.year
              )}
              editFlag={editMode}
              relevantTarget={editedOmset.find(targetObject => targetObject.personId === person.id)}
              setTarget={changeTarget}
            />  
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={weekArray.length + 1}><b>Total</b></Table.HeaderCell>
            <Table.HeaderCell><b>{parseToRp(calculateTotalPrice(dofs))}</b></Table.HeaderCell>
            <Table.HeaderCell>
              <b>{
                editMode ? 
                parseToRp(calculateTotalTarget(editedOmset)) :
                parseToRp(omset.target)
              }</b>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <ErrorMessage message={error?.message}/>
      {editMode ?
        <>
          <DeleteOmsetModal 
            omset={omset.individualTarget} 
            open={openDeleteModal} 
            setOpen={setOpenDeleteModal}
            omsetId={omset.id}
          />
          <Button
            floated='right'
            color='green'
            style={styles.saveButton}
            onClick={handleSave}
            loading={loading}
          >
            Save
          </Button> 
          <Button
            floated='right'
            style={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </> :
        <></>
      }
    </div>
  );
};

const calculateTotalTarget = (targetArray) => {
  return targetArray.reduce((sum, currentTargetObject) => {
    return sum + currentTargetObject.target
  }, 0);
};

const styles = {
  saveButton: {
    marginRight: '2em'
  },
  cancelButton: {
    marginRight: '1em'
  },
  deleteButton: {
    float: 'right',
    cursor: 'pointer',
    color: '#f20000',
  },
  deleteButtonHover: {
    color: '#c70101',
    backgroundColor: '#E7E7E7'
  }
}

export default OmsetTable;