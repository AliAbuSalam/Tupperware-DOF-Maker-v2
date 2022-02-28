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
    case 'EDIT_OMSET_PLAN':
      const isNewOmsetInDateRange = (action.data.date.year === state.dateFrom.year && action.data.date.month >= state.dateFrom.month)
        || (action.data.date.year > state.dateFrom.year && action.data.date.year < state.dateTo.year)
        || (action.data.date.year === state.dateTo.year && action.data.date.month <= state.dateFrom.month);
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

export const SET_OMSET_PLANS = (data) => {
  return {
    type: 'SET_OMSET_PLANS',
    data
  };
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