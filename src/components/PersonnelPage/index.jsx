import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Table, Button } from 'semantic-ui-react';

import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import CustomTable from '../Table';
import { GET_ALL_PERSONNEL } from '../../gql/queries';
import { SET_PEOPLE } from '../../reducers/personReducers';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';
import DeletePerson from './DeletePerson';

const PersonnelPage = () => {
  const people = useSelector(state => state.people);
  const [fetchPersonnel, { data: personnelData, loading: personnelLoading }] = useLazyQuery(GET_ALL_PERSONNEL);
  const [activePerson, setActivePerson] = useState(undefined);
  const [mode, setMode] = useState('normal');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleActionButtonClick = (buttonMode) => {
    if(mode === buttonMode){
      setMode('normal');
    } else if(mode !== buttonMode){
      setMode(buttonMode);
    }
  };

  const handlePersonClick = (person) => {
    if(mode === 'edit'){
      setActivePerson(person);
      setOpenEditModal(true);
    }
    if(mode === 'delete'){
      setActivePerson(person);
      setOpenDeleteModal(true);
    }
  };

  useEffect(() => {
    fetchPersonnel()
    dispatch(SET_ACTIVE_PAGE('personnel'));
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if(personnelData && !personnelLoading){
      dispatch(SET_PEOPLE(personnelData.getPersons));
    }
  }, [personnelData, personnelLoading, dispatch]);

  return(
    <div>
      <AddPerson />
      <EditPerson activePerson={activePerson} open={openEditModal} setOpen={setOpenEditModal} setActivePerson={setActivePerson}/>
      <DeletePerson activePerson={activePerson} open={openDeleteModal} setOpen={setOpenDeleteModal} setActivePerson={setActivePerson}/>
      <Button 
        color='yellow' 
        style={{ marginLeft: '3rem' }} 
        onClick={() =>handleActionButtonClick('edit')}
      >
        Edit Person
      </Button>
      <Button 
        color='red' 
        style={{ marginRight: '3rem'}} 
        floated='right' onClick={() => handleActionButtonClick('delete')}
      >
        Delete Person
      </Button>
      <CustomTable mode={mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Consultant Id</Table.HeaderCell>
            <Table.HeaderCell>position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {people?.map(person => 
            <Table.Row key={person.id}
              onClick={() => handlePersonClick(person)}
            >
              <Table.Cell>{person.name}</Table.Cell>
              <Table.Cell>{person.consultantId}</Table.Cell>
              <Table.Cell>{person.position}</Table.Cell>
            </Table.Row>  
          )}
        </Table.Body>
      </CustomTable>
    </div>
  );
};

export default PersonnelPage;
