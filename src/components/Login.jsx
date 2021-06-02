import React, { useState, useEffect } from 'react';
import { Grid, Form, Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LOGIN } from '../gql/queries';
import { SET_TOKEN } from '../reducers/tokenReducers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mutate, { loading, error, data }] = useMutation(LOGIN);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_TOKEN(data.login.value));
      localStorage.setItem('token', data.login.value);
      history.push('/');
    }
  }, [data, loading, dispatch, history]);

  const handleSubmit = () => {
    mutate({
      variables: {
        username,
        password
      }
    }).catch(e => console.log('error: ', e.message));
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
            <Dimmer inverted active={loading}>
              <Loader />
            </Dimmer>
            <Button fluid size='large' type='submit' disabled={!username || !password || loading || false}>
              Login
            </Button>
            {error ? <div style={{ color: 'red'}}>{error.message}</div>: <></>}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;