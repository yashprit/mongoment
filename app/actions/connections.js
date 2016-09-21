import DataSource from '../node/db';
import { push } from 'react-router-redux';
import MongoDbConnection from '../node/mongo-client';

const ds = new DataSource();

export const CONNECTIONS_LOADED = 'CONNECTIONS_LOADED';
export const CONNECTIONS_LOAD_ERROR = 'CONNECTIONS_LOAD_ERROR';
export const CONNECTIONS_SAVE_ERROR = 'CONNECTIONS_SAVE_ERROR';
export const CONNECTIONS_SAVE = 'CONNECTIONS_SAVE';
export const CONNECTION_TEST_ERROR = 'CONNECTION_TEST_ERROR';
export const CONNECTION_TEST = 'CONNECTION_TEST';


function loadAllConnection(result){
  console.log(result);
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

function testConnectionDispatcher(result, message){
  return {
    type: CONNECTION_TEST,
    payload: {
      status: result,
      message: message
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

async function testConnection(...params){
  const client = new MongoDbConnection(...params);
  console.log(client)
  return await client.connect();
}

async function saveConnection(...params){
  return await ds.insertConnection(...params);
}

export function save(...params){
  return async (dispatch) => {
    try {
      const [name, ip, port, db] = params;
      const database = await testConnection(ip, port, port);
      const result = await saveConnection(name, ip, port, db);
      database.close()
      dispatch(connectionSave(result));
    } catch(e) {
      dispatch(error(CONNECTIONS_SAVE_ERROR, e));
    }
  }
}

export function test(...params){
  return async (dispatch) => {
    try {
      const [name, ip, port, db] = params;
      const database = await testConnection(ip, port, port);
      database.close();
      dispatch(testConnectionDispatcher(true, "Working fine"))
    } catch(e){
      console.log(e)
      dispatch(testConnectionDispatcher(false, e.message));
    }
  }
}

export function list(){
  return async (dispatch) => {
    try {
      const result = await ds.findAllConnections();
      dispatch(loadAllConnection(result));
    } catch(e){
      dispatch(error(CONNECTIONS_LOAD_ERROR, e));
    }
  }
}