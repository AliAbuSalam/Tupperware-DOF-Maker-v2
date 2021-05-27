import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Login from './components/Login';

const App = () => {
  const token = useSelector(state => state.token);

  useEffect(() => {
    console.log('token: ', token);
  }, [token]);

  return(<Login />);
};

export default App;