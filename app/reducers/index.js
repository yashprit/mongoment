import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import auth from './auth';
import connections from './connections';
import database from './database';

const rootReducer = combineReducers({
  counter,
  routing,
  auth,
  connections,
  database
});

export default rootReducer;
