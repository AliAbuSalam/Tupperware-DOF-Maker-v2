import { createStore, combineReducers } from 'redux';
import tokenReducer from './reducers/tokenReducers';
import itemReducers from './reducers/itemReducers';
import activePageReducers from './reducers/activePageReducers';
import personReducers from './reducers/personReducers';
import dofEditReducers from './reducers/dofEditReducers';
import dofReducers from './reducers/dofReducers';
import itemStarReducers from './reducers/itemStarReducers';
import clipboardReducers from './reducers/clipboardReducers';
import groupReducers from './reducers/groupReducers';
import omsetReducers from './reducers/omsetReducers';

const reducer = combineReducers({
  token: tokenReducer,
  items: itemReducers,
  activePage: activePageReducers,
  people: personReducers,
  dofs: dofReducers,
  dofEdit: dofEditReducers,
  itemsStar: itemStarReducers,
  clipboard: clipboardReducers,
  groups: groupReducers,
  omsets: omsetReducers
});

const store = createStore(reducer);

export default store;