import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import ItemsPage from './components/ItemsPage';
import NavBar from './components/NavBar';
import { SET_TOKEN } from './reducers/tokenReducers';

const App = () => {
  const dispatch = useDispatch();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = useSelector(state => state.token);

  useEffect(() => {
    if(tokenFromLocalStorage){
      dispatch(SET_TOKEN(tokenFromLocalStorage));
    }
  }, []);/* eslint-disable-line */

  useEffect(() => {
    if(token){
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  if(!token){
    return(
      <Login />
    );
  }
  return(
    <div>
      <NavBar />
      <Switch>
        <Route path='/items'>
          <ItemsPage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;