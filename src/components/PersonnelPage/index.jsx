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
import Filter from './Filter';
import PositionDropdown from './PositionDropdown';

const PersonnelPage = () => {
  const people = useSelector(state => state.people);
  const [fetchPersonnel, { data: personnelData, loading: personnelLoading }] = useLazyQuery(GET_ALL_PERSONNEL);
  const [activePerson, setActivePerson] = useState(undefined);
  const [mode, setMode] = useState('normal');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [consultantIdFilter, setConsultantIdFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [filteredPeople, setFilteredPeople] = useState(people);
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

  const handlePositionFilterChange = (_, data) => {
    setPositionFilter(data.value);
  };

  useEffect(() => {
    console.log(positionFilter);
  }, [positionFilter]);

  useEffect(() => {
    fetchPersonnel()
    dispatch(SET_ACTIVE_PAGE('personnel'));
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if(personnelData && !personnelLoading){
      dispatch(SET_PEOPLE(personnelData.getPersons));
    }
  }, [personnelData, personnelLoading, dispatch]);

  useEffect(() => {
    const newFilteredPeople = people
      .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .filter(person => person.consultantId.toLowerCase().includes(consultantIdFilter.toLowerCase()))
      .filter(person => {
        if(!positionFilter){
          return true;
        }
        return person.position === positionFilter
      });
    setFilteredPeople(newFilteredPeople);
  }, [nameFilter, consultantIdFilter, positionFilter, people]);

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
            <Table.HeaderCell>
              Name
              <Filter filter={nameFilter} setFilter={setNameFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Consultant Id
              <Filter filter={consultantIdFilter} setFilter={setConsultantIdFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <PositionDropdown
                value={positionFilter}
                onChange={handlePositionFilterChange}
                clearable
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredPeople?.map(person => 
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
