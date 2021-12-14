import React, { useEffect } from 'react';
import { Grid, Segment, Form } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { GET_ALL_GROUPS } from '../../gql/queries';
import { SET_ALL_GROUPS } from '../../reducers/groupReducers';

const OmsetDateInput = () => {
  const groups = useSelector(state => state.groups);
  const [fetchGroups, { data, loading }] = useLazyQuery(GET_ALL_GROUPS);
  const dispatch = useDispatch();

  const mapGroupsForDropdown = (group) => {
    return {
      key: group.id,
      text: group.member.find(member => member.isLeader).name,
      value: group.id
    }
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

  return(
    <Segment>
      <Grid columns='2'>
          <Grid.Column width={7}>
            <Form>
              <Form.Dropdown
                label='Group'
                clearable
                search
                selection
                loading={loading}
                options={groups ? groups.map(mapGroupsForDropdown): []}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form.Input />
          </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default OmsetDateInput;