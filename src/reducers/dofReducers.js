const initialState = {
  type: '',
  date: {
    year: '',
    month: '',
    week: ''
  },
  dofs: []
};

const dofReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_DOFS':
      const returnObject = {
        type: action.data.type,
        date: action.data.date,
        dofs: action.data.data
      };
      return returnObject;
    default:
      return state;
  }
};

export const SET_DOFS = ({ data, date }) => {
  return {
    type: 'SET_DOFS',
    data: data,
    date
  }
};

export default dofReducers;