import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Grid, Segment, Button } from 'semantic-ui-react';

import DateInput from '../DateInput';
import { GET_DOFS } from '../../gql/queries';
import { SET_DOFS } from '../../reducers/dofReducers';
import DofCard from './DofCard';

const DofPage = () => {
  const [getDofs, { data, loading, error }] = useLazyQuery(GET_DOFS);
  const dofs = useSelector(state => state.dofs.dofs);
  const [activeDate, setActiveDate] = useState({
    year: '',
    month: '',
    week: ''
  });
  const dispatch = useDispatch();

  const handleGetDofs = () => {
    console.log('activeDate.year: ', activeDate.year);
    console.log('typeof: ', typeof activeDate.year);
    getDofs({
      variables: {
        year: parseInt(activeDate.year),
        month: activeDate.month,
        week: activeDate.week || undefined
      } 
    });
  };

  useEffect(() => {
    if(data && !loading){
      console.log('data: ', data);
      dispatch(SET_DOFS({
        data: data.getMultipleDofs,
        date: data.getMultipleDofs.date
      }));
    }
  }, [data, loading, dispatch]);

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
      <Grid columns={2} >
      {dofs.length > 0 ? dofs[0].map(dof => {
        return(
          <Grid.Column key={dof.id}>
            <DofCard dof={dof} color='green'/>
          </Grid.Column>
        );
      }) : <></>}
      </Grid>
      
    </div>
  );
};

export default DofPage;