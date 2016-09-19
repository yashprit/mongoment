import DataSource from '../node/db';
import { push } from 'react-router-redux';
import MongoDbConnection from '../node/mongo-client';

const ds = new DataSource();

export const CONNECTIONS_LOADED = 'CONNECTIONS_LOADED';
export const CONNECTIONS_LOAD_ERROR = 'CONNECTIONS_LOAD_ERROR';
export const CONNECTIONS_SAVE_ERROR = 'CONNECTIONS_SAVE_ERROR';
export const CONNECTIONS_SAVE = 'CONNECTIONS_SAVE';


function loadAllConnection(result){
  return {
    type: CONNECTIONS_LOADED,
    payload: {
      connections: result
    }
  }
}

function connectionSave(result){
  return {
    type: CONNECTIONS_SAVE,
    payload: {
      connections: result
    }
  }
}

function error(type, error){
  return {
    type: type,
    payload: {
      isError: true,
      error: error.message
    }
  }
}

async function testConnection(){
  const client = new MongoDbConnection();
  const db = await client.connect();
  db.close();
}

export function save(name, ip, port, db, options){
  return async (dispatch) => {
    dispatch(loading());
    try {
      const result = await db.insertConnection(name, ip, port, db, options);
      dispatch(connectionSave(result));
    } catch(e) {
      dispatch(error(CONNECTIONS_SAVE_ERROR, e));
    }
  }
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