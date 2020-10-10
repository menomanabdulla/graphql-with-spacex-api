import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.jpg';

import Lanuches from './components/Launches';
import Lanuch from './components/Launch';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="spaceX"
          style={{
            width: 300,
            display: 'block',
            margin: '0 auto 30px auto'
          }}/>
          <Route exact path="/" component={Lanuches} />
          <Route path="/launch/:id" component={Lanuch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
