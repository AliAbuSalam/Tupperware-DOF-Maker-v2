const initialState = {
  value: null
};

const tokenReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET':
      return {
        ...state,
        value: action.data
      };
    default:
      return state;
  }
};

export const SET_TOKEN = (token) => {
  return {
    type: 'SET',
    data: token
  }
};

export default tokenReducer;