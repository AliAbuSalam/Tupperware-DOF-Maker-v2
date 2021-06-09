import React, { useState } from 'react';
import { Modal, Input, Button } from 'semantic-ui-react';

import forceInputToNumber from '../../lib/forceInputToNumber';

const ChangeStock = ({ item, open, setOpen }) => {
  const [value, setValue] = useState('');
  
  const handleStockChange = (type) => {
    
  }

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Add/Remove Stock</Modal.Header>
      <Modal.Content>
        <Input
          label='Number of items'
          value={value}
          onChange={({ target }) => setValue(forceInputToNumber(target.value))}
        />
        <Button circular icon='minus' floated='right'/>
        <Button circular icon='add' floated='right'/>
      </Modal.Content>
    </Modal>
  );
};

export default ChangeStock;