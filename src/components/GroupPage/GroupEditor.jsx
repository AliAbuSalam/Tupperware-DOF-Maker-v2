import React, { useState, useEffect } from 'react';
import { Table, Icon, Button, Segment, Grid, Dropdown } from 'semantic-ui-react';

import DeleteIcon from '../DeleteIcon';

const GroupEditor = ({ memberList, setMemberList, availableMember, children }) => {
  const [members, setMembers] = useState([]);
  const [memberToAdd, setMemberToAdd] = useState(undefined);

  useEffect(() => {
    const eligibleMembers = availableMember.filter(member => !memberList.map(member => member.id).includes(member.id));
    setMembers(eligibleMembers.map(member => {
      return {
        key: member.id,
        text: member.name,
        value: member.id
      }
    }));
  }, [availableMember, memberList]);

  const handleSetLeader = (memberId) => {
    setMemberList(memberList.map(member => {
      if(member.id === memberId){
        return { ...member, isLeader: true}
      }
      return { ...member, isLeader: false}
    }))
  };

  const handleAddMember = (member) => {
    let memberObject = { ...member };
    memberList.length === 0 ? memberObject.isLeader = true : memberObject.isLeader = false;
    setMemberList(memberList.concat(memberObject));
  };

  const handleRemoveMember = (memberIdToRemove) => {
    const newMembers = memberList.filter(member => member.id !== memberIdToRemove);
    const leader = newMembers.find(member => member.isLeader);
    if(!leader && newMembers.length > 0){
      newMembers[0].isLeader = true;
      setMemberList(newMembers);
    } else {
      setMemberList(newMembers);
    }
  }

  return(
    <Segment>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Member</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Leader</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList?.map(member => 
            <Table.Row key={member.id}>
              <Table.Cell>{member.name}</Table.Cell>
              <Table.Cell>{member.position}</Table.Cell>
              <Table.Cell>
                {member.isLeader === true ? 
                  <Icon name='checkmark' color='green'/>:
                  <Button size='mini' onClick={() => handleSetLeader(member.id)}>Set as leader</Button>
                }
                <DeleteIcon style={{ marginTop: '5px'}} onClick={() => handleRemoveMember(member.id)}/>
              </Table.Cell>
            </Table.Row>  
          )}
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Grid columns='2'>
        <Grid.Row>
          <Grid.Column>
            <Table collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Dropdown 
                      clearable
                      search 
                      selection
                      options={members}
                      onChange={(_, data) => {
                        const member = availableMember.find(member => member.id === data.value);
                        setMemberToAdd(member);
                      }}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {memberToAdd ? memberToAdd.position: <></>}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {memberToAdd ? 
                      <Button 
                        circular 
                        icon='add' 
                        color='green' 
                        size='tiny' 
                        onClick={() => handleAddMember(memberToAdd)}
                      />: 
                      <></>
                    }
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default GroupEditor;