import {
  CONNECTIONS_LOADED, 
  CONNECTIONS_LOADED_ERROR
} from '../actions/auth';

export default function auth(state = {
  isError: false,
  error: null,
  connections: []
}, action){
  switch(action.type){
    case CONNECTIONS_LOADED, CONNECTIONS_SAVE: 
      return {
        ...state,
        connections: action.payload.connections
      }
    case CONNECTIONS_LOADED_ERROR, CONNECTIONS_SAVE_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}
