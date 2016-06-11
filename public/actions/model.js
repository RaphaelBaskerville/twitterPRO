// //NOT SURE IF I NEED ISO FETCH
// import fetch from 'isomorphic-fetch';

import axios from 'axios';

export const MODEL_CREATED = 'MODEL_CREATED';
export const NEW_MODELS = 'NEW_MODELS';
export const TARGET_PROFILE_SELECTED = 'TARGET_PROFILE_SELECTED';
export const MODEL_DELETED = 'MODEL_DELETED';
export const __LISTS = '__LISTS';
export const __MESSAGES = '__MESSAGES';
export const __TARGETS = '__TARGETS';
export const __HASHTAGS = '__HASHTAGS';
export const GET_TWITTER_OBJ = 'GET TWITTER_OBJ';
export const GET_TWITTER_OBJ_FOR_PROFILE = 'GET TWITTER_OBJ_FOR_PROFILE';

export function getModel (type, options) {
  let request = axios.get('/api/models/'+ type + options + '?token=' + window.localStorage.id_token);
  let actionType;
  switch(type){
    case 'list':
      actionType = __LISTS;
      break;
    case 'target':
      actionType = __TARGETS;
      break;
    case 'message':
      actionType = __MESSAGES;
      break;
    case 'hashtag':
      actionType = __HASHTAGS;
      break;
  }
  return {
    type:actionType,
    payload:request
  };
}

export function deleteModel (key, value, type) {
  console.log('deleting model', type, value);
  let request = axios.delete('api/models/'+type + '/' + key + '/' + value + '?token=' + window.localStorage.id_token, {});
  return {
    type:MODEL_DELETED,
    payload: request
  };
}

export function postModel (type, payload) {
  let request = axios.post('/api/models/' + type + '?token=' + window.localStorage.id_token, payload);

  return {
    type: MODEL_CREATED,
    payload: request
  };
}

export function getTwitterObj(handle) {
  let request = axios.post('/userObj', {handle:handle});

  return {
    type: GET_TWITTER_OBJ,
    payload: request
  };
}

export function getTwitterObjForUserProfile(handle) {
  let request = axios.post('/userObj', {handle:handle});

  return {
    type: GET_TWITTER_OBJ_FOR_PROFILE,
    payload: request
  };
}
// function recModel (data, action, modelType) {
//   return {
//     type: action,
//     payload: data,
//     modelType: modelType
//   };
// }

// // POST a model
// export function createModel(params, payload, type) {
//   let url = '/api/models/' + type;
//   let myHeaders = new Headers();
//   myHeaders.append('Accept', 'application/json');
//   myHeaders.append('Content-Type', 'application/json');

//   console.log('createModel: ', type);
//   console.log('payload: ',payload);
//   console.log('params: ', params);
//   console.log('POST to url: ',url);

//   return dispatch => {
//     return fetch(url, { 
//       method:'POST',
//       mode:'CORS',
//       cache: 'default',
//       headers: myHeaders,
//       body: JSON.stringify(payload)
//     })
//       .then(data => data.json())
//       .then(json => dispatch(recModel(json, MODEL_CREATED, 'list')));
//   };
// }

// export function getTwitterObj(handle) {
//   let myHeaders = new Headers();
//   myHeaders.append('Accept', 'application/json');
//   myHeaders.append('Content-Type', 'application/json');


//   return dispatch => {
//     console.log('fetching TWITTER PROFILE');
//     return fetch('/userObj', { 
//       method:'POST',
//       mode:'CORS',
//       cache: 'default',
//       headers: myHeaders,
//       body: JSON.stringify({handle:handle})
//     })
//       .then(data => data.json())
//       .then(json => dispatch(recModel(json, TARGET_PROFILE_SELECTED, 'targetprofile')));
//   };
// }
