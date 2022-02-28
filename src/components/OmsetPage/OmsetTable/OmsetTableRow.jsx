import React from 'react';
import { Table } from 'semantic-ui-react';

import parseToRp from '../../../lib/parseToRp';
import EditableCell from './EditableCell';

const OmsetTableRow = ({ person, weekArray, omset, dofs, editFlag, relevantTarget, setTarget }) => {
  return(
    <Table.Row>
      <Table.Cell>{person.name}</Table.Cell>
      {weekArray.map(week => 
        <WeekTotalRow
          key={week}
          omsetDate={omset.date}
          dofs={dofs?.filter(dof => 
            dof.date.week === week
          )}
        />
      )}
      <Table.Cell>
        {parseToRp(calculateTotalPrice(dofs?.filter(dof => dof.owner.name === person.name)))}
      </Table.Cell>
      <EditableCell
        editFlag={editFlag}
        editableTarget={relevantTarget.target}
        setEditableTarget={setTarget}
        personId={person.id}
      >
        {parseToRp(omset.individualTarget.find(targetObject => 
          targetObject.personId === person.id
        )?.target)}
      </EditableCell>
    </Table.Row>  
  );
}

const WeekTotalRow = ({ dofs }) => {
  return(
    <Table.Cell>
      {parseToRp(calculateTotalPrice(dofs))}
    </Table.Cell>
  );
};

export const calculateTotalPrice = (dofs) => {
  return dofs.reduce((sum, currentDof) => {
    return sum + currentDof.totalPriceItems
  }, 0);
};


export default OmsetTableRow;