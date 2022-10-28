import React, { useEffect, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { GET_ALL_GROUPS, GET_OMSET_PLANS } from '../../gql/queries';
import { SET_ALL_GROUPS } from '../../reducers/groupReducers';
import { SET_OMSET_PLANS } from '../../reducers/omsetReducers';
import DateInput from '../DateInput';
import ErrorMessage from '../ErrorMessage';
import GroupsDropdown from './GroupsDropdown';

const OmsetDateInput = () => {
  const groups = useSelector(state => state.groups);
  const [fetchGroups, { data, loading }] = useLazyQuery(GET_ALL_GROUPS);
  const initialDateObject = {
    year: '',
    month: ''
  };
  const [dateFrom, setDateFrom] = useState(initialDateObject);
  const [dateTo, setDateTo] = useState(initialDateObject);
  const [groupToFetch, setGroupToFetch] = useState(undefined);
  const [fetchOmsetPlans, { data: dataOmset, loading: loadingOmset, error: errorOmset }] = useLazyQuery(GET_OMSET_PLANS, {
    fetchPolicy: 'cache-and-network',
    onError: error => console.log(error.networkError)
  });
  const [disableSearchFlag, setDisableSearchFlag] = useState(false);
  const dispatch = useDispatch();
  const handleChangeGroup = (_, data) => {
    setGroupToFetch(data.value);
  };

  const handleSearch = () => {
    fetchOmsetPlans({ variables: {
      year: dateFrom.year ? parseInt(dateFrom.year): undefined,
      month: dateFrom.month,
      year2: dateTo.year ? parseInt(dateTo.year): undefined,
      month2: dateTo.month || undefined,
      groupId: groupToFetch
    }})
  };

  useEffect(() => {
    if(!groups){
      fetchGroups()
    }
  }, [groups, dispatch]);

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_ALL_GROUPS(data.getAllGroups));
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    if(dataOmset && !loadingOmset){
      dispatch(SET_OMSET_PLANS({
        group: groups?.find(group => group.id === groupToFetch),
        dateFrom: {
          year: parseInt(dateFrom.year),
          month: dateFrom.month
        },
        dateTo: dateTo.year && dateTo.month ? 
        {
          year: parseInt(dateTo.year) || null,
          month: dateTo.month || null,
        }: undefined,
        omsetPlans: dataOmset.getOmsetPlans.omsetPlans,
        relatedDofs: dataOmset.getOmsetPlans.relatedDofs
      }));
    }    
  }, [dataOmset, loadingOmset]);/* eslint-disable-line */

  useEffect(() => {
    const dateFromFilled = dateFrom.year && dateFrom.month;
    const dateToFilled = dateTo.year && dateTo.month;
    const dateToEmpty = !dateTo.year && !dateTo.month;
    //dateInvalid is when dateTo is later than dateFrom
    const dateInvalid = parseInt(dateTo.year) < parseInt(dateFrom.year) || 
      ((parseInt(dateFrom.year) === parseInt(dateTo.year)) && (dateFrom.month > dateTo.month))
    setDisableSearchFlag(!((dateFromFilled && dateToFilled && !dateInvalid) || (dateFromFilled && dateToEmpty)));
    //Only enable search button if: dateFrom and dateTo is filled; dateFrom is filled and both dateTo input is not filled; date is not invalid.
  }, [dateFrom, dateTo]);

  return(
    <Segment>
      <div style={gridStyles.mainGrid}>
        <div style={gridStyles.divForm}>
          <Form>
            <GroupsDropdown
              label='Group'
              clearable
              search
              selection
              disabled={loadingOmset}
              loading={loading}
              groups={groups}
              onChange={handleChangeGroup}
              setSelectedGroupId={setGroupToFetch}
            />
          </Form>
        </div>
        <div style={gridStyles.gridChildren}>
          <Form style={gridStyles.formGrid}>
              <b>From:</b> <DateInput date={dateFrom} setDate={setDateFrom} noWeek clearableMonth disabled={loadingOmset}/>
              <b>To:</b> <DateInput date={dateTo} setDate={setDateTo} noWeek clearableMonth disabled={loadingOmset || !dateFrom.year || !dateFrom.month}/>
          </Form>
        </div>
        <div style={gridStyles.gridChildren}>
          <Button 
            size='large' 
            disabled={disableSearchFlag || false}
            onClick={handleSearch}
            loading={loadingOmset}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <ErrorMessage message={errorOmset?.message}/>
      </div>
    </Segment>
  );
};

const gridStyles = {
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr'
  },
  divForm: {
    margin: 'auto 0'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    alignItems: 'center'
  },
  gridChildren: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divInput: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
}

export default OmsetDateInput;