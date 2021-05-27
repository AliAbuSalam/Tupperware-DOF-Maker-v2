import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Switch,
  Link,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const token = useSelector(state => state.token);
  console.log('token: ', token);
  if(!token){
    return(
      <Login />
    );
  }
  return(
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
  );
};

export default App;