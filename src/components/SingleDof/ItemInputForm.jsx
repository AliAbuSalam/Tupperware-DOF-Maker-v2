import React, { useState } from 'react';
import { Form, Table, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import forceInputToNumber from '../../lib/forceInputToNumber';
import parseToRp from '../../lib/parseToRp';

const styles = {
  headerCell: {
    width: '10rem'
  },
  tableContainer: {
    
  },
  numberInput: {
    maxWidth: '5rem'
  },
  buttonContainer: {
    textAlign: 'right',
    marginTop: '0.5rem'
  },
  container: {
    marginBottom: '2rem'
  }
}

const ItemInputForm = ({ items, reducerFunction }) => {
  const [qty, setQty] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [dropdownValue, setDropdownValue] = useState('');
  const dispatch = useDispatch();
  const itemOptions = items.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item.name
    };
  });

  const handleAddItem = () => {
    if(selectedItem && qty > 0){
      const objectToAdd = {
        item: selectedItem.id,
        itemName: selectedItem.name,
        price: parseInt(selectedItem.price),
        numberOfItems: parseInt(qty),
        totalPrice: qty*selectedItem.price,
        status: 'new'
      };
      dispatch(reducerFunction(objectToAdd));
      setDropdownValue('');
      setQty('');
      setSelectedItem(undefined);
    }
  };

  return(
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.headerCell}>
                <Form.Dropdown 
                  placeholder='add item'
                  search
                  selection
                  options={itemOptions}
                  clearable
                  value={dropdownValue}
                  onChange={(_, data) => {
                    const itemToSelect = items.find(item => item.id === data.value);
                    setDropdownValue(data.value);
                    setSelectedItem(itemToSelect);
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell  style={styles.headerCell}>
                <Form.Input value={qty} onChange={({ target }) => setQty(forceInputToNumber(target.value))} style={styles.numberInput}/>
              </Table.HeaderCell>
              <Table.HeaderCell  style={styles.headerCell}>
                {selectedItem ? parseToRp(selectedItem.price): <></>}
              </Table.HeaderCell>
              <Table.HeaderCell  style={styles.headerCell}>
                {selectedItem && qty ? parseToRp(selectedItem.price * qty): <>Rp. 0.00</>}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </div>
      <div style={styles.buttonContainer}>
        <Button color='green' onClick={handleAddItem}>Add Item</Button>
      </div>
    </div>
  );
};

export default ItemInputForm;