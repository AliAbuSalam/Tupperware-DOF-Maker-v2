const initialState = [];

const personReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_PEOPLE':
      return action.data;
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

export default personReducers;