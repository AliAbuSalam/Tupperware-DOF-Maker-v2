import React from 'react';
import { Table as TableSemantic } from 'semantic-ui-react';

const Table = ({ mode, children }) => {

  return(
    <TableSemantic 
        celled 
        selectable={mode !== 'normal' ? true : false} 
        color={mode === 'edit' ? 'grey': mode === 'delete' ? 'red' : undefined} 
        inverted={mode !== 'normal' ? true: false}
      >
        {children}
    </TableSemantic>
  );
};

export default Table;