const initialState = null;

const itemReducers = (state = initialState, action ) => {
  switch(action.type){
    case 'SET_ITEMS':
      return action.data;
    case 'ADD_ITEM':
      return state.concat(action.data);
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.data);
    case 'UPDATE_ITEMS':
      const idArray = action.data.map(item => item.id);
      return state.map(item => {
        if(!idArray.includes(item.id)){
          return item;
        }
        return action.data.find(updatedItem => updatedItem.id === item.id);
      });
    default:
      return state;
  }
};

export const SET_ITEMS = (data) => {
  return {
    type: 'SET_ITEMS',
    data
  }
};

export const ADD_ITEM = (data) => {
  return {
    type: 'ADD_ITEM',
    data
  }
};

export const REMOVE_ITEM = (id) => {
  return {
    type: 'REMOVE_ITEM',
    data: id
  }
}

export const UPDATE_ITEMS = (arrayOfItems) => {
  return {
    type: 'UPDATE_ITEMS',
    data: arrayOfItems
  }
}

export default itemReducers;