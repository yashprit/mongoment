import MongoDbConnection from '../node/mongo-client';
import MongoDBOp from '../node/mongo-op';

export const DATABASE_LOAD_ERROR = 'DATABASE_LOAD_ERROR';
export const DATABASE_LOAD = 'DATABASE_LOAD';
export const DOCUMENT_LOADED = 'DOCUMENT_LOADED';

function loading(){
  return {
    type: LOADING
  }
}

function error(type, error){
  return {
    type: type,
    payload: {
      error: error.message
    }
  }
}

function loadAllCollection(data){
  return {
    type: DATABASE_LOAD,
    payload: {
      collections: data
    }
  }
}

function loadAllDocuments(data) {
  return {
    type: DOCUMENT_LOADED,
    payload: {
      documents: data
    }
  }
}

async function getAllCollection(url){
  const mongodbCon = new MongoDbConnection();
  const db = await mongodbCon.connectByUri(url);

  const mongoOp = new MongoDBOp(db);
  return await mongoOp.collections();
}

async function fetchDocuments(url, collectionName, condition) {
  const mongodbCon = new MongoDbConnection();
  const db = await mongodbCon.connectByUri(url);

  const mongoOp = new MongoDBOp(db);
  return await mongoOp.documents(collectionName);
}

async function runCommand(uri, collectionName, methodName, args) {
  console.log(uri, collectionName, methodName, args);
  const mongodbCon = new MongoDbConnection();
  const db = await mongodbCon.connectByUri(uri);

  const mongoOp = new MongoDBOp(db);
  return await mongoOp.run(collectionName, methodName, args);
}

export function connect(uri){
  return async (dispatch) => {
    try {
      console.log(uri)
      const result = await getAllCollection(uri);

      dispatch(loadAllCollection(result));
    } catch(e){
      dispatch(error(DATABASE_LOAD_ERROR, e));
    }
  }
}

export function getAllDocuments(url, collectionName) {
  return async (dispatch) => {
    try {
      const result = await fetchDocuments(url, collectionName);
      dispatch(loadAllDocuments(result));
    } catch(e){
      dispatch(error(DATABASE_LOAD_ERROR, e));
    }
  }
}

export function run(uri, collectionName, methodName, args) {
  return async (dispatch) => {
    try {
      const result = await runCommand(uri, collectionName, methodName, args);
      dispatch(loadAllDocuments(result));
    } catch(e){
      console.log(e);
      dispatch(error(DATABASE_LOAD_ERROR, e));
    }
  }
}