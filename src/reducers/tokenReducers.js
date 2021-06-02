const initialState = null;

const tokenReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_TOKEN':
      return action.data;
    case 'REMOVE_TOKEN':
      localStorage.removeItem('token');
      return null;
    default:
      return state;
  }
};

export const SET_TOKEN = (token) => {
  return {
    type: 'SET_TOKEN',
    data: token
  }
};

export const REMOVE_TOKEN = () => {
  return {
    type: 'REMOVE_TOKEN'
  }
};

export default tokenReducer;