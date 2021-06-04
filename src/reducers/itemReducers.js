const initialState = null;

const itemReducers = (state = initialState, action ) => {
  switch(action.type){
    case 'SET_ITEMS':
      return action.data;
    case 'ADD_ITEM':
      return state.concat(action.data);
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.data);
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

export default itemReducers;