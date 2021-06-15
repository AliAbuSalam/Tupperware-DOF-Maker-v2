const initialState = [];

const personReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_PEOPLE':
      return action.data;
    case 'ADD_PERSON':
      return state.concat(action.data);
    case 'EDIT_PERSON':
      return state.map(person => {
        if(person.id === action.data.id){
          return action.data
        }
        return person;
      });
    case 'REMOVE_PERSON':
      return state.filter(person => person.id !== action.data);
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

export const EDIT_PERSON = (data) => {
  return {
    type: 'EDIT_PERSON',
    data
  }
}

export const REMOVE_PERSON = (data) => {
  return {
    type: 'REMOVE_PERSON',
    data
  }
};

export default personReducers;