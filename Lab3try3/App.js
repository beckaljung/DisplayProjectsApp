
import React from 'react';
import {StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navigator from './routes/homeStack';

const TOKEN = "8302c404a2206ac369e4843cbe43a5475c410e61 ";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `bearer ${TOKEN}`,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigator/>
    </ApolloProvider>        
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'blue',
    width: '100%',
    height:'100%'
  },
});

export default App;
