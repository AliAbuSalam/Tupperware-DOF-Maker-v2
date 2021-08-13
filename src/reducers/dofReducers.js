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
    case 'REMOVE_DOF':
      console.log('state before deletion: ', state);
      const newWeekDofArray = state.dofs.length === 0 
        ? []
        : state.dofs[action.data.weekIndex]?.dof?.filter(dof => dof.id !== action.data.dof.id);
      const newDofs = state.dofs.map((weekDof, index) => {
        if(index === parseInt(action.data.weekIndex)){
          return {
            ...weekDof,
            dof: newWeekDofArray
          }
        }
        return weekDof
      });
      console.log('newDofArray: ', newWeekDofArray);
      console.log('state after deletion: ', {
        ...state,
        type: action.type,
        dofs: newDofs
      });
      return {
        ...state,
        type: action.type,
        dofs: newDofs
      };
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

export const REMOVE_DOF = ({ dof, weekIndex }) => {
  return {
    type: 'REMOVE_DOF',
    data: {
      dof,
      weekIndex
    }
  }
}

export default dofReducers;