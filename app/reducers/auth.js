import {
	LOADING, 
	LOGGEDIN_SUCCESS, 
	LOGGEDIN_ERROR,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS
} from '../actions/auth';

const state = {
  isLoading: false,
  error: null
}

export default function auth(state = {
  isLoading: false
}, action){
  switch(action.type){
    case LOADING: 
      return {
        ...state,
        isLoading: false
      }
    case LOGGEDIN_ERROR, REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}
