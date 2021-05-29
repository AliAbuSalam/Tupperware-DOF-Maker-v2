const initialState = null;

const activePageReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_ACTIVE_PAGE':
      return action.data;
    default:
      return state;
  }
};

export const SET_ACTIVE_PAGE = (pageName) => {
  return {
    type: 'SET_ACTIVE_PAGE',
    data: pageName
  }
};

export default activePageReducers