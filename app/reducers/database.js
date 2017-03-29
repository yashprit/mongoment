import {
	DATABASE_LOAD_ERROR, 
	DATABASE_LOAD,
  DOCUMENT_LOADED
} from '../actions/database';

const state = {
  isLoading: false,
  error: null
}

export default function database(state = {
  collections: [],
  documents: []
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
    case DOCUMENT_LOADED:
      return {
        ...state,
        documents: action.payload.documents
      }
    default:
      return state
  }
}
