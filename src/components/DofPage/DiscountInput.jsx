import React, { useState, useEffect } from 'react';
import { Header, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import forceInputToNumber from '../../lib/forceInputToNumber';
import { EDIT_DISCOUNT_DOF_EDIT } from '../../reducers/dofEditReducers';

const DiscountInput = () => {
  const discount = useSelector(state => state.dofEdit?.discount);
  const [value, setValue] = useState(!isNaN(discount) ? (discount*100).toString() : '');
  const dispatch = useDispatch();

  const handleDiscountChange = () => {
    const newDiscount = parseInt(value);
    if(newDiscount < 0 || newDiscount > 100){
      return;
    }
    dispatch(EDIT_DISCOUNT_DOF_EDIT(newDiscount/100));
  };

  useEffect(() => {
    if(discount){
      setValue(discount * 100);
    }
  }, [discount])

  return(
    <>
      <Header as='h3'>Discount: </Header>
      <Input 
        value={value} 
        style={styles.input} 
        onChange={({ target }) => setValue(forceInputToNumber(target.value))}
        error={parseInt(value) > 100 || !value}
        onBlur={handleDiscountChange}
      /> %
    </>
  );
};

const styles = {
  input: {
    width: '4rem',
  }
}

export default DiscountInput;