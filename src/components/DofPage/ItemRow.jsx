import React, { useState } from 'react';
import { Table, Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import parseToRp from '../../lib/parseToRp';
import forceInputToNumber from '../../lib/forceInputToNumber';
import { EDIT_USED_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';
import { EDIT_USED_STAR_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';
import DeleteIcon from '../DeleteIcon';
import DeleteModal from './DeleteModal';

const styles = {
  qtyInput: {
    maxWidth: '4em'
  },
  qtyCell: {
    cursor: 'pointer'
  },
}

const ItemRow = ({ item, pageType, itemType }) => {
  const [editQty, setEditQty] = useState(false);
  const [qty, setQty] = useState(item.numberOfItems);
  const [total, setTotal] = useState(item.totalPrice);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const newQty = forceInputToNumber(target.value);
    setQty(newQty);
    setTotal(newQty * item.price);
  }

  const handleBlur = (itemType) => {
    const editedItem = {
      ...item,
      numberOfItems: parseInt(qty),
      totalPrice: total,
      status: 'edited'
    }
    if(itemType !== 'STAR_ITEM'){
      dispatch(EDIT_USED_ITEM_DOF_EDIT(editedItem));
    } else {
      console.log('dispatch edit star');
      dispatch(EDIT_USED_STAR_ITEM_DOF_EDIT(editedItem));
    }
    setEditQty(false);
  };

  return(
    <>
      <DeleteModal item={item} itemType={itemType} openModal={toggleDeleteModal} setOpen={setToggleDeleteModal}/>
      <Table.Row positive={item.status === 'new'} warning={item.status === 'edited'}>
        <Table.Cell>{item.itemName}</Table.Cell>
        {
          pageType === 'singleDof'
            ? <Table.Cell style={styles.qtyCell}onClick={() => setEditQty(true)}>
            {
              !editQty
                ? qty
                : <Form.Input
                    value={qty}
                    style={styles.qtyInput}
                    onChange={handleChange}
                    autoFocus
                    onBlur={() => handleBlur(itemType)}
                  />
            }
          </Table.Cell>
          : <Table.Cell>{qty}</Table.Cell>
        }
        
        {pageType === 'singleDof' ? <Table.Cell>{parseToRp(item.price)}</Table.Cell>: <></>}
        <Table.Cell>
          {parseToRp(total)}
          {pageType === 'singleDof'
            ? <DeleteIcon onClick={() => {
              setToggleDeleteModal(true)
            }}/>
            : <></>
          }
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ItemRow;