import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SET_ACTIVE_PAGE } from '../reducers/activePageReducers';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_ACTIVE_PAGE('home'));
  }, [])
  
  return(
  <div>
    <h1>Home Page</h1>
  </div>);
};

export default Home;