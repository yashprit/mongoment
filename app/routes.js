import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ConnectionsPage from './containers/ConnectionsPage';
import DatabasePage from './containers/DatabasePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConnectionsPage} />
    <Route path="/connections" component={ConnectionsPage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/database" component={DatabasePage}/>
  </Route>
);
