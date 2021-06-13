const initialState = [];

const personReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_PEOPLE':
      return action.data;
    case 'ADD_PERSON':
      return state.concat(action.data);
    default:
      return state;
  }
};

export const SET_PEOPLE = (data) => {
  return {
    type: 'SET_PEOPLE',
    data
  };
};

export const ADD_PERSON = (data) => {
  return {
    type: 'ADD_PERSON',
    data
  };
};

export default personReducers;