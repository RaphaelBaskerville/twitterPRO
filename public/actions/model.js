export function getModel(type, options, action) {
  return dispatch => {
    console.log('in getModel', type, action);
    return fetch('//localhost:3000/api/models/'+ type + options)
          .then(data => data.json())
          .then(json => dispatch(recModel(json, action, type)));
  };
}

function recModel (data, action, type) {
  console.log('recTargets called');
  console.log(data);
  return {
    type: action,
    payload: data,
    modelType: type
  };
}
