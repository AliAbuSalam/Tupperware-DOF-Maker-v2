import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import client from './gql/ApolloClient';
import store from './store';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root')
);