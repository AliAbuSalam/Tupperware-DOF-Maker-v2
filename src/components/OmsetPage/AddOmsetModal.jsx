import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import GroupsDropdown from './GroupsDropdown';
import forceInputToNumber from '../../lib/forceInputToNumber';
import { CREATE_OMSET_PLAN } from '../../gql/queries';
import { ADD_OMSET_PLAN } from '../../reducers/omsetReducers';

const AddOmsetModal = ({ style, date, ...rest}) => {
  const groups = useSelector(state => state.groups);
  const [open, setOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [newGroupTarget, setNewGroupTarget] = useState([]);
  const [createOmset, { loading, error }] = useMutation(CREATE_OMSET_PLAN, { variables: { date }});
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  }

  const handleTargetValueChange = (personId) => (_, { value }) => {
    setNewGroupTarget(newGroupTarget.map(memberTarget => {
      return memberTarget.personId === personId ?
      { ...memberTarget, 
        target: parseInt(forceInputToNumber(value) || 0)
      } :
      { ...memberTarget }
    }));
  };

  const handleCreate = () => {
    createOmset({ variables: {
      groupId: selectedGroupId,
      individualTarget: newGroupTarget.map(({ personId, target }) => ({ personId, target}))
    }}).then(({ data }) => {
      dispatch(ADD_OMSET_PLAN({ 
        omset: data.createOmsetPlan.omsetPlan,
        dofs: data.createOmsetPlan.relatedDofs
      }));
      handleClose();
    })
  };

  useEffect(() => {
    const groupMember = groups.find(group => group.id === selectedGroupId)?.member
    const groupTarget = groupMember ? groupMember.map(({ personId, name}) => ({ personId, name, target: 0})) : [];
    setNewGroupTarget(groupTarget);
  }, [selectedGroupId, groups]);

  return(
    <Modal
      trigger={<Button color='green' style={style}>Add Omset Plan</Button>}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
    > 
      <Modal.Header>Create new omset</Modal.Header>
      <Modal.Content>
        <Form>
          <GroupsDropdown 
            groups={groups}
            setSelectedGroupId={setSelectedGroupId}
            label='Group'
            clearable
            search
            selection
            style={styles.dropdown}
          />
        </Form>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {newGroupTarget.map(member => 
              <Table.Row key={member.personId}>
                <Table.Cell>{member.name}</Table.Cell>
                <Table.Cell>
                  <Input
                    value={member.target}
                    onChange={handleTargetValueChange(member.personId)}
                  />
                </Table.Cell>
              </Table.Row>  
            )}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button circular icon='cancel' onClick={handleClose}/>
        <Button circular icon='plus' color='green' onClick={handleCreate} loading={loading}/>
      </Modal.Actions>
    </Modal>
  );
};

const styles = {
  dropdown: {
    width: '50%'
  },
  
}

export default AddOmsetModal;