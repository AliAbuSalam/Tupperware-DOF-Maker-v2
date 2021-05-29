import { createStore, combineReducers } from 'redux';
import tokenReducer from './reducers/tokenReducers';
import itemReducers from './reducers/itemReducers';
import activePageReducers from './reducers/activePageReducers';

const reducer = combineReducers({
  token: tokenReducer,
  items: itemReducers,
  activePage: activePageReducers
});

const store = createStore(reducer);

export default store;