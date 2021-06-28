import React, { useState } from 'react';
import { Button, Label, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import parseToRp from '../../lib/parseToRp';
import forceInputToNumber from '../../lib/forceInputToNumber';
import { SET_STAR_PRICE as SET_STAR_PRICE_STATE } from '../../reducers/itemStarReducers';
import { SET_STAR_PRICE } from '../../gql/queries';

const PricePerStar = (props) => {
  const starPrice = useSelector(state => state.itemsStar.starPrice);
  const [changePrice, { loading }] = useMutation(SET_STAR_PRICE);
  const [newStarPrice, setNewStarPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const dispatch = useDispatch();

  const handleChangePrice = () => {
    changePrice({
      variables: {
        price: parseInt(newStarPrice)
      }
    }).then(({ data }) => {
      dispatch(SET_STAR_PRICE_STATE(data.setStarPrice.price));
      setNewStarPrice('');
      setShowPriceForm(false);
    }).catch(error=> setErrorMessage(error.message));
  }

  const handleTriggerButton = () => {
    if(!showPriceForm) setShowPriceForm(true);
    else {
      setErrorMessage(undefined);
      setShowPriceForm(false);
    }
  }

  const handleEnter = (event) => {
    if(event.key === 'Enter'){
      handleChangePrice();
    }
  }

  return(
    <div {...props}>
      <Button as='div' labelPosition='right' onClick={handleTriggerButton}>
        <Button color='yellow'>
          Price per Star
        </Button>
        <Label pointing='left'>
          {parseToRp(starPrice)}
        </Label>
      </Button>
      {showPriceForm ?
        <>
          <Input 
            value={newStarPrice}
            onKeyPress={handleEnter}
            onChange={({ target }) => setNewStarPrice(forceInputToNumber(target.value))}
          />
          <Button content='Set' color='yellow' onClick={handleChangePrice} loading={loading}/>
        </>:<></> }
      <div style={{ color: 'red' }}>{errorMessage ? errorMessage: <></>}</div>
    </div>
  );
};

export default PricePerStar;