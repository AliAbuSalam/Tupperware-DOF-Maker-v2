const initialState = null;

const groupReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_ALL_GROUPS':
      return action.data;
    case 'ADD_GROUP':
      return state.concat(action.data);
    case 'EDIT_GROUP':
      return state.map(group => {
        return group.id === action.data.id ?
          action.data : 
          group
      });
    default:
      return state;
  }
};

export const SET_ALL_GROUPS = (data) => {
  return {
    type: 'SET_ALL_GROUPS',
    data
  }
};

export const ADD_GROUP = (data) => {
  return {
    type: 'ADD_GROUP',
    data
  }
};

export const EDIT_GROUP = (data) => {
  return {
    type: 'EDIT_GROUP',
    data
  }
};

export default groupReducers;