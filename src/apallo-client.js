import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    'Authorization': `Apikey ${process.env.REACT_APP_STEPZEN_KEY}`,
    'Content-Type': `application/json`,
  },
  cache: new InMemoryCache(),
});

export default client