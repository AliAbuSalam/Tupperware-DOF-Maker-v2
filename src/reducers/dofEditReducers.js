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
        totalPrice: state.totalPrice + action.data.totalPrice,
        isDofEdited: true
      };
    case 'EDIT_USED_ITEM':
      const newState = {
        ...state,
        usedItems: state.usedItems.map(item => mapArrayWithEditedItem(item, action.data)),
      };
      const newTotalPriceItems = countTotalPrices(newState.usedItems);
      return {
        ...newState,
        totalPriceItems: newTotalPriceItems,
        totalPrice: (newTotalPriceItems * (1 - newState.discount))+ newState.totalPriceStars,
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
        totalPrice: (newStateForStar.totalPriceItems*(1 - newStateForStar.discount)) + newTotalPriceStars,
        isDofEdited: true
      };
    case 'DELETE_USED_ITEM':
      return deleteUsedItemFunction(state, action.data);
    case 'DELETE_USED_STAR_ITEM':
      return deleteUsedStarItemFunction(state, action.data);
    case 'REMOVE_DOF_EDIT':
      return null;
    case 'EDIT_DISCOUNT':
      if(isNaN(action.data) ||action.data > 1 || action.data < 0){
        return state;
      }
      return {
        ...state,
        discount: action.data,
        totalPrice: (state.totalPriceItems * (1 - action.data)) + state.totalPriceStars,
        isDofEdited: true
      };
    case 'PASTE_FROM_CLIPBOARD':
      return pasteFromClipboard(state, action.data);
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

export const EDIT_DISCOUNT_DOF_EDIT = (data) => {
  return {
    type: 'EDIT_DISCOUNT',
    data
  }
}

export const RESET_EDIT_FLAG = () => {
  return {
    type: 'RESET_EDIT_FLAG',
  }
}

export const PASTE_CLIPBOARD = (data) => {
  return {
    type: 'PASTE_FROM_CLIPBOARD',
    data
  }
};

const deleteUsedItemFunction = (state, data) => {
  const newUsedItems = state.usedItems.filter(item => item.itemName !== data.itemName);
  const newTotalPriceItems = countTotalPrices(newUsedItems);
  return {
    ...state,
    usedItems: newUsedItems,
    totalPriceItems: newTotalPriceItems,
    totalPrice: (newTotalPriceItems * (1 - state.discount)) + state.totalPriceStars,
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
    totalPrice: (state.totalPriceItems*(1 - state.discount)) + newTotalPriceStarItems,
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

const pasteFromClipboard = (state, itemFromClipboard) => {
  return {
    ...state,
    usedItems: itemFromClipboard.usedItems,
    usedItemStars: itemFromClipboard.usedItemStars,
    totalPriceItems: itemFromClipboard.totalPriceItems,
    totalPriceStars: itemFromClipboard.totalPriceStars,
    totalPrice: itemFromClipboard.totalPrice,
    discount: itemFromClipboard.discount,
    isDofEdited: true
  }
};

export default dofEditReducers;