import DataSource from '../node/db';
import { push } from 'react-router-redux';

const ds = new DataSource();

export const CONNECTIONS_LOADED = 'CONNECTIONS_LOADED';
export const CONNECTIONS_LOAD_ERROR = 'CONNECTIONS_LOAD_ERROR';


function loadAllConnection(result){
  return {
    type: CONNECTIONS_LOADED,
    payload: {
      connections: result
    }
  }
}

function error(error){
  return {
    type: CONNECTIONS_LOAD_ERROR,
    payload: {
      isError: true,
      error: error.message
    }
  }
}

export function save(){

}

export function list(){
  return async (dispatch) => {
    dispatch(loading());
    try {
      const result = await ds.findAllConnections();
      dispatch(loadAllConnection(result));
    } catch(e){
      dispatch(error(CONNECTIONS_LOAD_ERROR, e));
    }
  }
}