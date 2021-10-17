import compareDates from "../lib/compareDates";

const initialState = {
  type: '',
  date: {
    year: '',
    month: '',
    week: ''
  },
  dofs: [],
  newlyAddedDofLocation: []
};

const dofReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_DOFS':
      const returnObject = {
        ...state,
        type: action.data.type,
        date: action.data.date,
        dofs: action.data.data
      };
      return returnObject;
    case 'REMOVE_DOF':
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
      return {
        ...state,
        dofs: newDofs
      };
    case "ADD_DOF": 
      return handleAddDof(state, action.data);
    case 'UPDATE_DOF':
      return handleUpdateDof(state, action.data);
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

export const ADD_DOF = (data) => {
  return {
    type: 'ADD_DOF',
    data
  }
};

export const UPDATE_DOF = (data) => {
  return {
    type: 'UPDATE_DOF',
    data
  }
};

const handleAddDof = (state, data) => {
  const dofDate = data.date;
  let indexLocation;
  const correspondingWeeklyDof = state.dofs.find((weeklyDof, index) => {
    if(parseInt(weeklyDof.date.year) !== parseInt(dofDate.year)){
      return false;
    }
    if(parseInt(weeklyDof.date.month) !== parseInt(dofDate.month)){
      return false;
    }
    if(parseInt(weeklyDof.date.week) !== parseInt(dofDate.week)){
      return false;
    }
    indexLocation = index;
    return true;
  });
  const dofLocation = {
    id: data.id,
    weekIndex: indexLocation
  }
  const newWeeklyDofObject = {
    date: correspondingWeeklyDof.date,
    dof: correspondingWeeklyDof.dof.concat(data)
  };  
  const newDofState = state.dofs.map(dofObject => {
    if(compareDates(dofObject.date, dofDate)){
      return newWeeklyDofObject;
    }
    return dofObject;
  })
  return { 
    ...state, 
    dofs: newDofState, 
    newlyAddedDofLocation: state.newlyAddedDofLocation.concat(dofLocation)};
}

const handleUpdateDof = (state, data) => {
  if(state.dofs.length === 0){
    return state;
  }
  const weekIndex = data.weekIndex;
  const newWeeklyDofArray = state.dofs[weekIndex].dof.map(dof => dof.id === data.dof.id ? data.dof : dof);
  const newWeeklyDofObject = {
    ...state.dofs[weekIndex],
    dof: newWeeklyDofArray
  };
  const newState = {
    ...state,
    dofs: state.dofs.map((dofObject, index) => index === parseInt(weekIndex) ? newWeeklyDofObject: dofObject)
  };
  return newState;
};

export default dofReducers;