import React from 'react';
import { Table, Input } from 'semantic-ui-react';

const EditableCell = ({ editFlag, children, editableTarget, setEditableTarget, personId }) => {

  return(
    <Table.Cell>
      {editFlag ? 
        <Input 
          style={styles.input}
          value={editableTarget}
          onChange={setEditableTarget((personId))}
        /> :
        children
      }
    </Table.Cell>
  );
};

const styles = {
  input: {
    width: '8rem'
  }
}

export default EditableCell;