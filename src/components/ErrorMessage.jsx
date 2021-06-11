import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = (message) => {
  return(
    <Message hidden={!message} error={true} style={{ textAlign: 'center' }}>
      <Message.Header>ERROR</Message.Header>
      {message}
    </Message>
  );
};

export default ErrorMessage;