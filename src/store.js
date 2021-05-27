import { createStore, combineReducers } from 'redux';
import tokenReducer from './reducers/tokenReducers';

const reducer = combineReducers({
  token: tokenReducer
});

const store = createStore(reducer);

export default store;