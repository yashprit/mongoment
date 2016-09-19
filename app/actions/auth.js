import DataSource from '../node/db';
import { push } from 'react-router-redux';

const ds = new DataSource();

export const LOGGEDIN_ERROR = 'LOGGEDIN_ERROR';
export const LOGGEDIN_SUCCESS = 'LOGGEDIN_SUCCESS';
export const LOADING = 'LOADING';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

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

export function login(username, password, redirectUrl){
  return async (dispatch) => {
    dispatch(loading());
    try {
      const result = await ds.checkUserPresent(username, password);
      dispatch(push(`/${redirectUrl}`));
    } catch(e){
      dispatch(error(LOGGEDIN_ERROR, e));
    }
  }
}

export function registration(username, email, password, redirectUrl){
  return async (dispatch) => {
    dispatch(loading());
    try {
      const result = await ds.insertUser(username, email, password);
      dispatch(push(`/${redirectUrl}`));
    } catch(e){
      dispatch(error(REGISTRATION_ERROR, e));
    }
  }
}