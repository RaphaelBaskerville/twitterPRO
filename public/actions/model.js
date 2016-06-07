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
export function createGroup(params) {
  console.log('this',arguments);
  let username = window.localStorage.getItem('username');

  console.log('user',username);
  console.log('in getModel', params);
  let url = '/api/models/list/' + params.name + '/' + username;
  console.log('url',url);
  return dispatch => {
    return fetch(url, { 
      method:'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization:''
      },
    })
      .then(data => data.json())
      .then(json => dispatch(recModel(json, MODEL_CREATED, 'list')));
  }
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
