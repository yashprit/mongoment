import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import auth from './auth';
import connections from './connections';

const rootReducer = combineReducers({
  counter,
  routing,
  auth,
  connections
});

export default rootReducer;
