const initialState = null;

const tokenReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_TOKEN':
      localStorage.setItem('token', action.data);
      return action.data;
    case 'REMOVE_TOKEN':
      console.log('removing token');
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