const initialClipboard = null;

/*
  clipboardObjectExample = {
    usedItems: [...],
    usedItemStars: [...],
    totalPriceItems: Int,
    totalPriceStars: Int,
    totalPrice: Int,
    discount: Float
  };
*/

const clipboardReducers = (state = initialClipboard, action) => {
  switch(action.type){
    case 'COPY':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export const COPY_TO_CLIPBOARD = (data) => {
  return {
    type: 'COPY',
    data
  }
};

export const CLEAR_CLIPBOARD = () => {
  return {
    type: 'CLEAR'
  }
};

export default clipboardReducers;