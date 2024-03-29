import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import ItemsPage from './components/ItemsPage';
import ItemsStarPage from './components/ItemsStarPage';
import NavBar from './components/NavBar';
import PersonnelPage from './components/PersonnelPage';
import DofView from './components/DofView';
import DofSearch from './components/DofSearch';
import { SET_TOKEN } from './reducers/tokenReducers';
import SingleDof from './components/SingleDof';

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
        <Route path='/items' exact>
          <ItemsPage />
        </Route>
        <Route path='/itemsStar' exact>
          <ItemsStarPage />
        </Route>
        <Route path='/personnel' exact>
          <PersonnelPage />
        </Route>
        <Route path='/dofs' exact>
          <DofSearch />
        </Route>
        <Route path='/dofs/:date' exact>
          <DofSearch />
          <DofView />
        </Route>
        <Route path='/dofs/:date/:weekIndex/:id' exact>
          <SingleDof />
        </Route>
        <Route path='/login' exact>
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