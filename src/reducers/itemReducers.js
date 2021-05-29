const initialState = null;

const itemReducers = (state = initialState, action ) => {
  switch(action.type){
    case 'SET_ITEMS':
      return action.data;
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

export default itemReducers;