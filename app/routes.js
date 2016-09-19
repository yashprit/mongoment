import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import RegistartionPage from './containers/RegistartionPage';
import ConnectionsPage from './containers/ConnectionsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegistartionPage} />
    <Route path="/connections" component={ConnectionsPage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
