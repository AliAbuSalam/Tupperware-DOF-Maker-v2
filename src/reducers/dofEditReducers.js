const initialState = null;

const dofEditReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_DOF_EDIT':
      return action.data;
    case 'ADD_USED_ITEM':
      return {
        ...state,
        usedItems: state.usedItems.concat(action.data),
        totalPriceItems: state.totalPriceItems + action.data.totalPrice,
        totalPrice: state.totalPrice + (action.data.totalPrice * (1 - state.discount)),
        isDofEdited: true
      };
    case 'ADD_USED_STAR_ITEM':
      return {
        ...state,
        usedItemStars: state.usedItemStars.concat(action.data),
        totalPriceStars: state.totalPriceStars + action.data.totalPrice,
        totalPrice: state.totalPrice + (action.data.totalPrice * (1 - state.discount)),
        isDofEdited: true
      };
    case 'EDIT_USED_ITEM':
      console.log('edit used item');
      const newState = {
        ...state,
        usedItems: state.usedItems.map(item => mapArrayWithEditedItem(item, action.data)),
      };
      const newTotalPriceItems = countTotalPrices(newState.usedItems);
      return {
        ...newState,
        totalPriceItems: newTotalPriceItems,
        totalPrice: (newTotalPriceItems + newState.totalPriceStars) * (1 - newState.discount),
        isDofEdited: true
      };
    case 'EDIT_USED_STAR_ITEM':
      const newStateForStar = {
        ...state,
        usedItemStars: state.usedItemStars.map(item => mapArrayWithEditedItem(item, action.data))
      };
      const newTotalPriceStars = countTotalPrices(newStateForStar.usedItemStars);
      return {
        ...newStateForStar,
        totalPriceStars: newTotalPriceStars,
        totalPrice: (newTotalPriceStars + newStateForStar.totalPriceItems) * (1 - newStateForStar.discount),
        isDofEdited: true
      };
    case 'DELETE_USED_ITEM':
      return deleteUsedItemFunction(state, action.data);
    case 'DELETE_USED_STAR_ITEM':
      return deleteUsedStarItemFunction(state, action.data);
    case 'REMOVE_DOF_EDIT':
      return null;
    case 'RESET_EDIT_FLAG':
      return {
        ...state,
        isDofEdited: false
      }
    default:
      return state;
  }
};



export const SET_DOF_TO_EDIT = (data) => {
  return {
    type: 'SET_DOF_EDIT',
    data
  };
};

export const ADD_USED_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'ADD_USED_ITEM',
    data
  };
};

export const ADD_USED_STAR_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'ADD_USED_STAR_ITEM',
    data
  };
};

export const EDIT_USED_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'EDIT_USED_ITEM',
    data,
  };
};

export const EDIT_USED_STAR_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'EDIT_USED_STAR_ITEM',
    data,
  };
};

export const REMOVE_DOF_EDIT = () => {
  return {
    type: 'REMOVE_DOF_EDIT'
  };
};

export const DELETE_USED_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'DELETE_USED_ITEM',
    data
  }
};

export const DELETE_USED_STAR_ITEM_DOF_EDIT = (data) => {
  return {
    type: 'DELETE_USED_STAR_ITEM',
    data
  }
};

export const RESET_EDIT_FLAG = () => {
  return {
    type: 'RESET_EDIT_FLAG',
  }
}


const deleteUsedItemFunction = (state, data) => {
  const newUsedItems = state.usedItems.filter(item => item.itemName !== data.itemName);
  const newTotalPriceItems = countTotalPrices(newUsedItems);
  return {
    ...state,
    usedItems: newUsedItems,
    totalPriceItems: newTotalPriceItems,
    totalPrice: (newTotalPriceItems + state.totalPriceStars) * (1 - state.discount),
    isDofEdited: true
  }
}

const deleteUsedStarItemFunction = (state, data) => {
  const newUsedStarItems = state.usedItemStars.filter(item => item.itemName !== data.itemName);
  const newTotalPriceStarItems = countTotalPrices(newUsedStarItems);
  return {
    ...state,
    usedItemStars: newUsedStarItems,
    totalPriceStars: newTotalPriceStarItems,
    totalPrice: (state.totalPriceItems + newTotalPriceStarItems) * (1 - state.discount),
    isDofEdited: true
  };
};

const countTotalPrices = (itemList) => {
  return itemList.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0);
};

const mapArrayWithEditedItem = (item, editedItem) =>  {
  if(item.itemName !== editedItem.itemName){
    return item;
  }
  return editedItem;
};

export default dofEditReducers;