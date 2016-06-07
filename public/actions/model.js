export const POST_SUCCESS = 'POST_SUCCESS';

export function getModel(type, options, action) {
  return dispatch => {
    console.log('in getModel', type, action);
    return fetch('//localhost:3000/api/models/'+ type + options)
          .then(data => data.json())
          .then(json => dispatch(recModel(json, action, type)));
  };
}
export function createGroup(params) {
  console.log('this',arguments);
  return dispatch => {
    console.log('in getModel', params);
    let url = '//localhost:3000/api/models/list/' + params.name + '/' + params.user;
    console.log('url',url);
    return fetch(url, {method:'POST', headers: {}})
          .then(data => data.json())
          .then(json => dispatch(recModel(json, POST_SUCCESS, 'list')));
  }; 
}


function recModel (data, action, modelType) {
  console.log('recTargets called');
  console.log(data);
  return {
    type: action,
    payload: data,
    modelType: modelType
  };
}
