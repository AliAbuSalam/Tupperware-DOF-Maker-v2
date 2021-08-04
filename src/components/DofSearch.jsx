import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Segment, Form, Button } from 'semantic-ui-react';

import { GET_DOFS } from '../gql/queries';
import DateInput from './DateInput';
import { SET_DOFS } from '../reducers/dofReducers';
import { SET_ACTIVE_PAGE } from '../reducers/activePageReducers';

const DofSearch = () => {
  const [getDofs, { data, loading, error }] = useLazyQuery(GET_DOFS, { fetchPolicy: 'network-only' });
  const [activeDate, setActiveDate] = useState({
    year: '',
    month: '',
    week: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleGetDofs = () => {
    getDofs({
      variables: {
        year: parseInt(activeDate.year),
        month: activeDate.month,
        week: activeDate.week || undefined
      } 
    });
  };

  useEffect(() => {
    dispatch(SET_ACTIVE_PAGE('dofs'));
  }, [dispatch]);

  useEffect(() => {
    if(data && !loading){
      console.log('fetching done');
      dispatch(SET_DOFS({
        data: data.getMultipleDofs,
        date: data.getMultipleDofs.date
      }));
      if(!activeDate.week){
        history.push(`/dofs/${activeDate.year}-${activeDate.month}`);
      } else {
        history.push(`/dofs/${activeDate.year}-${activeDate.month}-${activeDate.week}`)
      }
    }
  }, [data, loading, dispatch, history]);

  return(
    <div>
      <Segment style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '650px' }}>
        <Form>
          <DateInput date={activeDate} setDate={setActiveDate} clearableWeek={true}/>
          <div style={{ textAlign: 'center'}}>
            <Button onClick={handleGetDofs}>Search</Button>
          </div>
        </Form>
      </Segment>
    </div>
  );
};

export default DofSearch;