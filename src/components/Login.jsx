import React, { useState } from 'react';
import { Grid, Form, Segment, Button } from 'semantic-ui-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
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