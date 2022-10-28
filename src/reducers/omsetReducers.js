const initialState = {
  group: undefined,
  dateFrom: undefined,
  dateTo: undefined,
  omsetPlans: [],
  relatedDofs: []
};

const omsetReducers = (state = initialState, action) => {
  switch(action.type){
    case 'SET_OMSET_PLANS':
      return action.data;
    case 'ADD_OMSET_PLAN':
      console.log('state.group: ', state.group);
      return handleAddOmsetPlan(state, action.data);
    case 'EDIT_OMSET_PLAN':
      const isNewOmsetInDateRange = checkWhetherDateInRange(action.data.date, state.dateFrom, state.dateTo);
      //<------------checkWhetherDateInRange function needed for checking
      const newOmsetPlans = isNewOmsetInDateRange ? state.omsetPlans.map(omsetPlan => omsetPlan.id === action.data.id ? action.data : omsetPlan)
        : state.omsetPlans.filter(omsetPlan => omsetPlan.id !== action.data.id);
      return {
        ...state,
        omsetPlans: newOmsetPlans
      };
    case 'REMOVE_OMSET_PLAN':
      return {
        ...state,
        omsetPlans: state.omsetPlans.filter(omset => omset.id !== action.data)
      };
    default:
      return state;
  };
};

const handleAddOmsetPlan = (state, data) => {
  const omsetData = data.omset;
  const isDateInRange = checkWhetherDateInRange(omsetData.date, state.dateFrom, state.dateTo);
  console.log('data on handleOmsetPlan: ', data);
  if(!isDateInRange){
    return state;
  }
  if(state.group && state.group.id !== omsetData.id){
    return state;
  }
  console.log('state: ', state);
  const existingRelatedDofsIds = state.relatedDofs.map(dof => dof.id);
  const uniqueNewRelatedDofs = data.dofs.filter(dof => !existingRelatedDofsIds.includes(dof.id));
  return {
    ...state,
    omsetPlans: state.omsetPlans.concat(omsetData),
    relatedDofs: state.relatedDofs.concat(uniqueNewRelatedDofs)
  };
};

const checkWhetherDateInRange = (dateToCheck, dateFrom, dateTo) => {
  if(!dateTo){
    return dateToCheck.year === dateFrom.year && dateToCheck.month === dateFrom.month;
  } else {
    return (dateToCheck.year === dateFrom.year && dateToCheck.month >= dateFrom.month)
    || (dateToCheck.year > dateFrom.year && dateToCheck.year < dateFrom.year)
    || (dateToCheck.year === dateTo.year && dateToCheck.month <= dateTo.month)
  }
};

export const SET_OMSET_PLANS = (data) => {
  return {
    type: 'SET_OMSET_PLANS',
    data
  };
};

export const ADD_OMSET_PLAN = ({ omset, dofs}) => {
  return {
    type: 'ADD_OMSET_PLAN',
    data: {
      omset,
      dofs
    }
  }
};

export const EDIT_OMSET_PLAN = (data) => {
  return {
    type: 'EDIT_OMSET_PLAN',
    data
  }
};

export const REMOVE_OMSET_PLAN = (data) => {
  return {
    type: 'REMOVE_OMSET_PLAN',
    data
  };
};

export default omsetReducers;