import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';

const PersonnelPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_ACTIVE_PAGE('personnel'));
  }, []);

  return(
    <h1>
      Personnel
    </h1>
  );
};

export default PersonnelPage;
