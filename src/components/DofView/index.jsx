import React, { useState, useEffect } from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLazyQuery } from '@apollo/client';

import DofCard from '../DofPage/DofCard';
import { GET_DOFS } from '../../gql/queries';
import { SET_DOFS } from '../../reducers/dofReducers';
import monthValueToText from '../../lib/monthValueToText';
import ActionButtons from './ActionButtons';
import DofSummary from './DofSummary';

const DofView = () => {
  const { date: dateUrl } = useParams();
  const activeDate = useSelector(state => state.dofs.date);
  const dofs = useSelector(state => state.dofs.dofs);
  const [dofsInView, setDofsInView] = useState([]);
  const [getDofs, { loading, data, error }] = useLazyQuery(GET_DOFS);
  const [openSummary, setOpenSummary] = useState(false);
  const [weekIndex, setWeekIndex] = useState(0);
  const dispatch = useDispatch();

  const changeDofsToShow = (index) => {
    setDofsInView(dofs[index]);
    setWeekIndex(index);
  };

  useEffect(() => {
    if(dofs.length > 0){
      setDofsInView(dofs[0]);
      setWeekIndex(0);
    }
  }, [dofs])

  useEffect(() => {
    const date = dateUrl.split('-');
    if(!activeDate.year){
      getDofs({
        variables: {
          year: parseInt(date[0]),
          month: parseInt(date[1]),
          week: parseInt(date[2])
        }
      });
    }
  }, []);

  useEffect(() => {
    if(data && !loading){
      console.log({
        data
      });
      dispatch(SET_DOFS({
        data: data.getMultipleDofs,
        date: data.getMultipleDofs.date
      }));
    }
  }, [data, loading, dispatch]);

  return(
    <div>
      <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}> 
        {dofs.length >= 4
          ? dofs.map((weeklyDof, i) => <Button key={weeklyDof.date.week} onClick={() => changeDofsToShow(i)}>Week {weeklyDof.date.week}</Button>)
          : <></>
        }
        {
          dofs.length > 0 
            ? <div style={{ marginTop: '1rem'}}><DofSummary open={openSummary} setOpen={setOpenSummary}/></div>
            : <></>
        }
      </div>
      {
        dofsInView.date
        ?
          <Header as='h2' style={{ textAlign: 'center' }}>{dofsInView?.date?.year} {monthValueToText(dofsInView?.date?.month)} week {dofsInView?.date?.week}</Header>
        : <></>
      }
      <ActionButtons dofs={dofsInView}/>
      <Grid columns={2}>
        {dofsInView.dof?.length > 0 ? dofsInView.dof.map((dof, index) => {
          return(
            <Grid.Column key={dof.id}>
              <DofCard dof={dof} color='green' weekIndex={weekIndex} week={dofsInView.date.week} dofNumber={index + 1}/>
            </Grid.Column>
          );
        }) : <></>}
      </Grid>  
    </div>
  );
};

export default DofView;