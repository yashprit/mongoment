import MongoDbConnection from '../node/mongo-client';
import MongoDBOp from '../node/mongo-op';

export const DATABASE_LOAD_ERROR = 'DATABASE_LOAD_ERROR';
export const DATABASE_LOAD = 'DATABASE_LOAD';

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

async function getAllCollection(url){
  const mongodbCon = new MongoDbConnection();
  const db = await mongodbCon.connectByUri(url);

  const mongoOp = new MongoDBOp(db);
  return await mongoOp.collections();
}

export function connect(uri){
  return async (dispatch) => {
    //dispatch(loading());
    try {
      console.log(uri)
      const result = await getAllCollection(uri);

      dispatch(loadAllCollection(result));
    } catch(e){
      dispatch(error(DATABASE_LOAD_ERROR, e));
    }
  }
}