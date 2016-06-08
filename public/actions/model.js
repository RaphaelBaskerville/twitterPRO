// import'es6-promise'.polyfill();
import fetch from 'isomorphic-fetch';

export const MODEL_CREATED = 'MODEL_CREATED';
export const  NEW_MODELS = 'NEW_MODELS';

export function getModel(type, options, action) {
  return dispatch => {
    console.log('in getModel', type, action);
    return fetch('/api/models/'+ type + options)
          .then(data => data.json())
          .then(json => dispatch(recModel(json, action, type)));
  };
}
export function createModel(params, payload, type) {
  let url = '/api/models/' + type;
  let myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');

  console.log('createModel: ', type);
  console.log('payload: ',payload);
  console.log('params: ', params);
  console.log('POST to url: ',url);
  
  return dispatch => {
    return fetch(url, { 
      method:'POST',
      mode:'CORS',
      cache: 'default',
      headers: myHeaders,
      body: JSON.stringify(payload)
    })
      .then(data => data.json())
      .then(json => dispatch(recModel(json, MODEL_CREATED, 'list')));
  };
}

export function createTarget(params, list) {
  let username = window.localStorage.getItem('username');
  console.log('this',arguments);
  console.log('user',username);
  console.log('in getModel', params);

  let payload = {};
  payload.handle = params.handle;
  payload.list = list.name;
  payload.user = username;
  console.log('payload', payload); 

  let url = '/api/models/target/';
  console.log('url',url);
  let myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');


  return dispatch => {
    return fetch(url, { 
      method:'POST',
      mode:'CORS',
      cache: 'default',
      headers: myHeaders,
      body: JSON.stringify(payload)
    })
      .then(data => data.json())
      .then(json => dispatch(recModel(json, MODEL_CREATED, 'target')));
  }
}

export function removeGroup(props) {
  console.log(props);
  return dispatch => {
    return dispatch({
      type:'test'
    });
  };
}


function recModel (data, action, modelType) {
  console.log('recTargets called');
  console.log('data',data,'action', action);
  return {
    type: action,
    payload: data,
    modelType: modelType
  };
}
