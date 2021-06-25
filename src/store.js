import { createStore, combineReducers } from 'redux';
import tokenReducer from './reducers/tokenReducers';
import itemReducers from './reducers/itemReducers';
import activePageReducers from './reducers/activePageReducers';
import personReducers from './reducers/personReducers';
import itemStarReducers from './reducers/itemStarReducers';

const reducer = combineReducers({
  token: tokenReducer,
  items: itemReducers,
  activePage: activePageReducers,
  people: personReducers,
  itemsStar: itemStarReducers
});

const store = createStore(reducer);

export default store;