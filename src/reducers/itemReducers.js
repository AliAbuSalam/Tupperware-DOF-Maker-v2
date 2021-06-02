const initialState = null;

const itemReducers = (state = initialState, action ) => {
  switch(action.type){
    case 'SET_ITEMS':
      return action.data;
    case 'ADD_ITEM':
      return state.concat(action.data);
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
}

export default itemReducers;