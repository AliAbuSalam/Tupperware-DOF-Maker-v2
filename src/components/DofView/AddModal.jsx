import React, { useEffect, useState } from 'react';
import { Modal, Button, Dropdown, Header } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import monthValueToText from '../../lib/monthValueToText';
import usePersonnel from '../../hooks/usePersonnel';
import { CREATE_DOF } from '../../gql/queries';
import { ADD_DOF } from '../../reducers/dofReducers';

const AddModal = ({ dofs }) => {
  const [open, setOpen] = useState(false);
  const [dofAddFlag, setDofAddFlag] = useState(false);
  const [newDofId, setNewDofId] = useState();
  const [owner, setOwner] = useState('');
  const personnelList = usePersonnel();
  const dofsLocation = useSelector(state => state.dofs.newlyAddedDofLocation);
  const [createDof, result] = useMutation(CREATE_DOF);
  const eligibleOwner = personnelList.filter(personnel => !dofs?.dof?.map(dof => dof.owner.name).includes(personnel.name));
  const ownerList = eligibleOwner.map(owner => {
    return {
      key: owner.name,
      text: owner.name,
      value: owner.id
    }
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = () => {
    if(owner){
      createDof({
        variables: {
          owner: owner,
          date: {
            year: parseInt(dofs.date.year),
            month: parseInt(dofs.date.month),
            week: parseInt(dofs.date.week)
          },
          usedItems: [],
          usedItemStars: [],
          discount: 0.25
        }
      }).then(({ data }) => {
        dispatch(ADD_DOF(data.createDof.dof));
        setNewDofId(data.createDof.dof.id)
        setDofAddFlag(true);
      }).catch(error => console.error(error))
    }
  };

  useEffect(() => {
    if(dofAddFlag && dofsLocation){
      console.log('useEffect1');
      const newDofLocation = dofsLocation.find(dofObject => dofObject.id === newDofId);
      history.push(`${location.pathname}${newDofLocation.weekIndex}/${newDofLocation.id}`);
    }
  }, [dofAddFlag, dofsLocation]);

  return(
    <Modal
      open={open}
      onClose={handleClose}
      trigger={<Button color='green' size='medium' onClick={() => setOpen(true)}>Add Dof</Button>}
    >
      <Modal.Header>Add Dof</Modal.Header>
      <Modal.Content>
        <Header as='h3' style={styles.date}>{dofs?.date?.year} {monthValueToText(dofs?.date?.month)} week {dofs?.date?.week}</Header>
        Owner: 
        <Dropdown 
          placeholder='Owner'
          selection
          value={owner}
          onChange={(_, data) => {
            setOwner(data.value);
          }}
          search
          options={ownerList}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button circular icon='cancel' onClick={handleClose}/>
        <Button icon='plus' circular color='green' loading={result.loading} onClick={handleAdd}/>
      </Modal.Actions>
    </Modal>
  );
};

const styles = {
  date: {
    textAlign: 'center'
  }
}

export default AddModal;