import {
	DATABASE_LOAD_ERROR, 
	DATABASE_LOAD
} from '../actions/database';

const state = {
  isLoading: false,
  error: null
}

export default function database(state = {
  collections: []
}, action){
  switch(action.type){
    case DATABASE_LOAD: 
      return {
        ...state,
        collections: action.payload.collections
      }
    case DATABASE_LOAD_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}
