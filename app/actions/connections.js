import DataSource from '../node/db';
import { push } from 'react-router-redux';
import MongoDbConnection from '../node/mongo-client';
import MongoDBOp from '../node/mongo-op';

const ds = new DataSource();

export const CONNECTIONS_LOADED = 'CONNECTIONS_LOADED';
export const CONNECTIONS_LOAD_ERROR = 'CONNECTIONS_LOAD_ERROR';
export const CONNECTIONS_SAVE_ERROR = 'CONNECTIONS_SAVE_ERROR';
export const CONNECTIONS_SAVE = 'CONNECTIONS_SAVE';
export const CONNECTION_TEST_ERROR = 'CONNECTION_TEST_ERROR';
export const CONNECTION_TEST = 'CONNECTION_TEST';


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

async function getCollectionCount(){
  const dbconfig = await ds.findAllConnections();
      
  return await Promise.all(dbconfig.map(async (value) => {
    const dbConnection = await testConnection(value.ip, value.port, value.db);
    const op = new MongoDBOp(dbConnection);
    const count = await op.count();
    return {
      ...value,
      collections: count
    }
  }));
}

async function testConnection(...params){
  const client = new MongoDbConnection(...params);
  const db = await client.connectByParams();
  return db;
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
      database.close();
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
      const result = await getCollectionCount();
      console.log("result", result)
      dispatch(loadAllConnection(result));
    } catch(e){
      dispatch(error(CONNECTIONS_LOAD_ERROR, e));
    }
  }
}