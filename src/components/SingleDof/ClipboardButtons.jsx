import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { COPY_TO_CLIPBOARD } from '../../reducers/clipboardReducers';
import { PASTE_CLIPBOARD } from '../../reducers/dofEditReducers';
import { CLEAR_CLIPBOARD } from '../../reducers/clipboardReducers';

const ClipboardButtons = ({ style, dof }) => {
  const clipboard = useSelector(state => state.clipboard);
  const dispatch = useDispatch();

  const handleCopy = (dof) => {
    const objectToCopy = {
      usedItems: dof.usedItems,
      usedItemStars: dof.usedItemStars,
      totalPriceItems: dof.totalPriceItems,
      totalPriceStars: dof.totalPriceStars,
      totalPrice: dof.totalPrice,
      discount: dof.discount
    }
    dispatch(COPY_TO_CLIPBOARD(objectToCopy));
  };

  const handlePaste = (itemFromClipboard) => {
    dispatch(PASTE_CLIPBOARD(itemFromClipboard));
  };

  const handleClear = () => {
    dispatch(CLEAR_CLIPBOARD());
  };

  return(
    <Button.Group style={{...styles.group, ...style }}>
      <Button disabled={dof?.usedItems?.length === 0} onClick={() => handleCopy(dof)}>Copy</Button>
      <Button disabled={clipboard === null} onClick={() => handlePaste(clipboard)}>Paste</Button>
      <Button disabled={clipboard === null} onClick={handleClear}>Clear</Button>
    </Button.Group>
  );
};

const styles = {
  group: {

  }
}

export default ClipboardButtons;