import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import { SET_PEOPLE } from '../../reducers/personReducers';
import { SET_ALL_GROUPS } from '../../reducers/groupReducers';
import { GET_ALL_GROUPS, GET_ALL_PERSONNEL } from '../../gql/queries';
import Group from './Group';
import AddGroupForm from './AddGroupForm';
import EditGroupForm from './EditGroupForm';
import DeleteGroupForm from './DeleteGroupForm';
import ErrorMessage from '../ErrorMessage';

const GroupPage = () => {
  const [fetchGroups, { data, error, loading }] = useLazyQuery(GET_ALL_GROUPS, { fetchPolicy: 'cache-and-network'});
  const [fetchMembers, { data: dataMember, error: errorMember, loadingMember }] = useLazyQuery(GET_ALL_PERSONNEL, { fetchPolicy: 'cache-and-network'});
  const groupList = useSelector(state => state.groups);
  const memberList = useSelector(state => state.people);
  const [peopleNotInGroup, setPeopleNotInGroup] = useState([]);
  const [pageState, setPageState] = useState(null);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_ACTIVE_PAGE('group'));
    fetchGroups();
    fetchMembers();
  }, []);

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_ALL_GROUPS(data.getAllGroups));
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    if(dataMember && !loadingMember){
      dispatch(SET_PEOPLE(dataMember.getPersons));
    }
  }, [dataMember, loadingMember, dispatch]);

  useEffect(() => {
    if(pageState === 'EDIT'){
      setGroupToEdit(null);
      //This is used to close editor after saving an edit
    }
  }, [groupList]);

  useEffect(() => {
    if(!groupList){
      return;
    }
    let peopleAlreadyInGroups = [];
    groupList.map(group => group.member).forEach(group => {
      peopleAlreadyInGroups = peopleAlreadyInGroups.concat(group);
    });
    const peopleAvailableForNewGroup = memberList.filter(member => !peopleAlreadyInGroups.map(person => person.personId).includes(member.id));
    setPeopleNotInGroup(peopleAvailableForNewGroup);
  }, [memberList, groupList]);

  const handleChangePageState = (state) => {
    setGroupToEdit(null);
    if(pageState !== state){
      setPageState(state);
    } else {
      setPageState(null);
    }
  }

  return(
    <div style={styles.divParent}>
      <Button color='green' onClick={() => handleChangePageState('ADD')} style={styles.button}>Add Group</Button>
      <Button color='yellow' onClick={() => handleChangePageState('EDIT')}>Edit Group</Button>
      <Button color='red' floated='right' onClick={() => handleChangePageState('DELETE')}>Delete Group</Button>
      <ErrorMessage message={error?.message}/>
      <ErrorMessage message={errorMember?.message} />
      <AddGroupForm pageState={pageState} availableMember={peopleNotInGroup}/>
      <EditGroupForm availableMember={peopleNotInGroup} groupToEdit={groupToEdit}/>
      <DeleteGroupForm group={groupToDelete} setGroup={setGroupToDelete}/>
      {loading ? 
        <Segment placeholder>
          <Loader active/>
        </Segment>
        :
        <Segment >
          <Grid columns='2'>
            {groupList?.map(group => 
              <Grid.Column key={group.id}>
                <Group group={group} pageState={pageState} setGroup={setGroupToEdit} setGroupToDelete={setGroupToDelete}/>
              </Grid.Column>)
            }
          </Grid>
        </Segment>
      }
    </div>
  );
};

const styles = {
  divParent: {
    margin: '1rem'
  },
  button: {
    marginRight: '1rem'
  }
}

export default GroupPage;