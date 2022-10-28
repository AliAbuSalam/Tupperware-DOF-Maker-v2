import React from 'react';
import { Form } from 'semantic-ui-react';

const GroupsDropdown = ({ groups, setSelectedGroupId, ...rest }) => {
  
  const handleChangeGroup = (_, data) => {
    setSelectedGroupId(data.value);
  };

  return(
    <Form.Dropdown
      options={groups ? groups.map(mapGroupsForDropdown): []}
      onChange={handleChangeGroup}
      {...rest}
    />
  );
};

const mapGroupsForDropdown = (group) => {
  return {
    key: group.id,
    text: group.member.find(member => member.isLeader).name,
    value: group.id
  }
};


export default GroupsDropdown;