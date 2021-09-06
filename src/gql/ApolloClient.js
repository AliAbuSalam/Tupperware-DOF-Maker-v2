import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const uri = process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:4000';

const httpLink = createHttpLink({
  uri
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    SingleDof: {
      fields: {
        usedItems: {
          merge(existing = [], incoming ){
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;