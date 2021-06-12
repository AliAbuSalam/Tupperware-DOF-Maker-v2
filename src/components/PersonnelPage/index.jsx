import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Table } from 'semantic-ui-react';

import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import { GET_ALL_PERSONNEL } from '../../gql/queries';
import { SET_PEOPLE } from '../../reducers/personReducers';

const PersonnelPage = () => {
  const [fetchPersonnel, { data, loading }] = useLazyQuery(GET_ALL_PERSONNEL);
  const people = useSelector(state => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPersonnel();
    dispatch(SET_ACTIVE_PAGE('personnel'));
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if(data && !loading){
      console.log('data for person', data);
      dispatch(SET_PEOPLE(data.getPersons));
    }
  }, [data, loading, dispatch]);

  return(
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
          <Table.Row>
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.consultantId}</Table.Cell>
            <Table.Cell>{person.position}</Table.Cell>
          </Table.Row>  
        )}
      </Table.Body>
    </Table>
  );
};

export default PersonnelPage;
