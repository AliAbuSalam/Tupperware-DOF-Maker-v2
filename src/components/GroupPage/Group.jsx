import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import DeleteIcon from '../DeleteIcon';

const Group = ({ group, pageState, setGroup, setGroupToDelete }) => {
  const mapMemberToTable = (firstRow) => (member, index) => (
    <Table.Row key={member.personId}>
      <Table.Cell>{firstRow ? index + 1 : index + 2}</Table.Cell>
      <Table.Cell>{member.name}</Table.Cell>
      <Table.Cell>{member.personalInfo.position}</Table.Cell>
      <Table.Cell>{member.isLeader ? <Icon color='green' name='checkmark' size='small'/>: <></>}</Table.Cell>
    </Table.Row>
  )

  const handleGroupEdit = (group) => {
    setGroup(group);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return(
    <Table 
      color={pageState === 'EDIT' ? 'yellow' : pageState === 'DELETE' ? 'red' : 'green'}
      style={pageState ==='EDIT' ? styles.groupTable: {}}
      onClick={pageState === 'EDIT' ? () => handleGroupEdit(group): undefined}
    >
      <Table.Header >
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Member</Table.HeaderCell>
          <Table.HeaderCell>Position</Table.HeaderCell>
          <Table.HeaderCell>
            Leader
            {pageState === 'DELETE' && <DeleteIcon onClick={() => setGroupToDelete(group)}/>}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {group.member.filter(member => member.isLeader).map(mapMemberToTable(true))}
        {group.member.filter(member => !member.isLeader).map(mapMemberToTable(false))}
      </Table.Body>
    </Table>
  );
};

const styles = {
  groupTable: {
    cursor: 'pointer'
  }
}

export default Group;