import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';

import monthValueToText from '../../lib/monthValueToText';
import SummaryTable from './SummaryTable';

const DofSummary = ({ open, setOpen }) => {
  const dofs = useSelector(state => state.dofs.dofs);
  const [dofIndexToShow, setDofIndexToShow] = useState(0);

  const handleWeekClick = (index) => {
    setDofIndexToShow(index);
  }

  const handleMonthClick = () => {
    setDofIndexToShow(null);
  }

  const dofsItemToShow = (index) => {
    if(index === null){
      let dofsInAMonth = [];
      dofs.forEach(weeklyDof => {
        dofsInAMonth = dofsInAMonth.concat(weeklyDof.dof);
      });
      return dofsInAMonth;
    }
    return dofs[index].dof;
  };

  return(
    <Modal 
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={<Button>Dof Summaries</Button>}
    >
      <Modal.Header>{dofIndexToShow !== null && dofIndexToShow >= 0 ? <>Summary of Week {dofs[dofIndexToShow].date.week}</>: <>Summary of {monthValueToText(dofs[0].date.month)}</>}</Modal.Header>
      <Modal.Content>
        <SummaryTable dofArray={dofsItemToShow(dofIndexToShow)}/>
      </Modal.Content>
      <Modal.Actions>
        {dofs.length > 1 ? <Button circular onClick={handleMonthClick}>{monthValueToText(dofs[0].date.month)}</Button>: <></> }
        {dofs ? dofs.map((weekObject, index) => <Button circular onClick={() => handleWeekClick(index)} key={index}>{weekObject.date.week}</Button>) : <></>}
      </Modal.Actions>
    </Modal>
  );
};

export default DofSummary;