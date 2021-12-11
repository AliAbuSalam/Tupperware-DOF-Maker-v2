import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'

import { CREATE_GROUP } from '../../gql/queries';
import { ADD_GROUP } from '../../reducers/groupReducers';
import GroupEditor from './GroupEditor';
import { styles } from './style';


const AddGroupForm = ({ pageState, availableMember }) => {
  const [memberList, setMemberList] = useState([]);
  const [createGroup, { data, loading }] = useMutation(CREATE_GROUP);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data && !loading){
      dispatch(ADD_GROUP(data.createGroup));
      setMemberList([]);
    }
  }, [data, loading, dispatch]);

  const handleCreateGroup = () => {
    createGroup({ variables: {
      leader: memberList.find(member => member.isLeader).id,
      member: memberList.filter(member => !member.isLeader).map(member => member.id)
    }}).catch(error => console.log('error: ', error.message));
  };

  if(pageState !== 'ADD'){
    return(
      <div></div>
    );
  } else {
    return(
      <GroupEditor 
        availableMember={availableMember}
        memberList={memberList}
        setMemberList={setMemberList}
      >
        <Button 
          floated='right' 
          color='green' 
          style={styles.buttonActionGroup}
          disabled={memberList.length <= 1}
          onClick={handleCreateGroup}
          loading={loading}
        >
          Create Group
        </Button>
      </GroupEditor>
    );
  }
};


export default AddGroupForm;