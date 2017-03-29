import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import connections from './connections';
import database from './database';

const rootReducer = combineReducers({
  routing,
  auth,
  connections,
  database
});

export default rootReducer;
