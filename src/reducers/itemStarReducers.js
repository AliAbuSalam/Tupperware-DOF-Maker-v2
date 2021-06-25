const initialState = {
  starPrice: 0,
  itemsList: []
};

const itemStarReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_ITEMS_STAR':
      const itemsWithPrice = action.data.map(item => changePriceOfItem(item, state.starPrice));
      return { ...state, itemsList: itemsWithPrice };
    case 'SET_STAR_PRICE':
      const itemsWithChangedPrice = state.itemsList.map(item => changePriceOfItem(item, action.data));
      return {
        starPrice: action.data,
        itemsList: itemsWithChangedPrice
      };
    case 'ADD_ITEM_STAR':
      const itemWithPrice = changePriceOfItem(action.data, state.starPrice);
      return {
        ...state,
        itemsList: state.itemsList.concat(itemWithPrice)
      };
    case 'EDIT_ITEM_STAR':
      const editedItemWithPrice = changePriceOfItem(action.data, state.starPrice);
      return {
        ...state,
        itemsList: state.itemsList.map(item => {
          if(item.id !== action.data.id){
            return item;
          }
          return editedItemWithPrice;
        })
      };
    case 'REMOVE_ITEM_STAR':
      return {
        ...state,
        itemsList: state.itemsList.filter(item => item.id !== action.data)
      };
    default:
      return state;
  }
};

const changePriceOfItem = (item, price) => {
  return {
    ...item,
    price: price*item.starCost
  };
}

export const SET_ITEMS_STAR = (data) => {
  return {
    type: 'SET_ITEMS_STAR',
    data
  };
};

export const SET_STAR_PRICE = (data) => {
  return {
    type: 'SET_STAR_PRICE',
    data
  };
};

export const ADD_ITEM_STAR = (data) => {
  return {
    type: 'ADD_ITEM_STAR',
    data
  };
};

export const REMOVE_ITEM_STAR = (data) => {
  return {
    type: 'REMOVE_ITEM_STAR',
    data
  };
};

export const EDIT_ITEM_STAR = (data) => {
  return {
    type: 'EDIT_ITEM_STAR',
    data
  };
};

export default itemStarReducers;