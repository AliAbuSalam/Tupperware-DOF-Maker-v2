import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import GroupEditor from './GroupEditor';
import { styles } from './style';
import { EDIT_GROUP } from '../../gql/queries';
import { EDIT_GROUP as EDIT_GROUP_REDUCER } from '../../reducers/groupReducers';

const EditGroupForm = ({ groupToEdit, availableMember }) => {
  const [memberList, setMemberList] = useState([]);
  const [editGroup, { data, loading }] = useMutation(EDIT_GROUP);
  const dispatch = useDispatch();

  useEffect(() => {
    if(groupToEdit){
      setMemberList(groupToEdit.member.map(member => {
        return {
          id: member.personId,
          name: member.name,
          isLeader: member.isLeader,
          position: member.personalInfo.position
        }
      }));
    }
  }, [groupToEdit]);

  useEffect(() => {
    if(data && !loading){
      dispatch(EDIT_GROUP_REDUCER(data.editGroup))
    }
  }, [data, loading, dispatch]);

  if(!groupToEdit){
    return(<></>);
  }

  const handleEditGroup = () => {
    editGroup({ 
      variables: {
        id: groupToEdit.id,
        leader: memberList.find(member => member.isLeader).id,
        member: memberList.filter(member => !member.isLeader).map(member => member.id)
      },
    });
  };

  return(
    <GroupEditor
      availableMember={availableMember}
      memberList={memberList}
      setMemberList={setMemberList}
    >
      <Button
        floated='right'
        color='yellow'
        style={styles.buttonActionGroup}
        disabled={memberList <= 1}
        onClick={handleEditGroup}
        loading={loading}
      >
        Edit Group
      </Button>
    </GroupEditor>
  );
};

export default EditGroupForm;