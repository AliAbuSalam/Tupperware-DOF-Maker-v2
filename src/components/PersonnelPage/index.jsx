import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Table } from 'semantic-ui-react';

import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import { GET_ALL_PERSONNEL } from '../../gql/queries';
import { SET_PEOPLE } from '../../reducers/personReducers';
import AddPerson from './AddPerson';

const PersonnelPage = () => {
  const people = useSelector(state => state.people);
  const [fetchPersonnel, { data: personnelData, loading: personnelLoading }] = useLazyQuery(GET_ALL_PERSONNEL);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log('fetching personnel....')
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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Consultant Id</Table.HeaderCell>
            <Table.HeaderCell>position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {people?.map(person => 
            <Table.Row key={person.id}>
              <Table.Cell>{person.name}</Table.Cell>
              <Table.Cell>{person.consultantId}</Table.Cell>
              <Table.Cell>{person.position}</Table.Cell>
            </Table.Row>  
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PersonnelPage;
