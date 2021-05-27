import React, { useState, useEffect } from 'react';
import { Grid, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { LOGIN } from '../gql/queries';
import { SET_TOKEN } from '../reducers/tokenReducers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mutate, { loading, data }] = useMutation(LOGIN);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_TOKEN(data.login.value));
    }
  }, [data, loading, dispatch]);

  const handleSubmit = () => {
    mutate({
      variables: {
        username,
        password
      }
    }).catch(e => console.log('error: ', e.message));
    console.log('username: ', username);
    console.log('password: ', password);
  };

  return(
    <Grid style={{ height: '100vh' }} verticalAlign='middle' textAlign='center'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form onSubmit={handleSubmit}>
          <Segment raised>
            <Form.Input 
              fluid 
              placeholder='Usernme' 
              icon='user' 
              iconPosition='left'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Input 
              placeholder='Password' 
              type='password'
              icon='lock'
              iconPosition='left'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button fluid size='large' type='submit' disabled={!username || !password || false}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;