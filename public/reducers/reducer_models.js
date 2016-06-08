export default function (state = {
  list:[],
  target:[]
}, action) {
  
  switch(action.type) {
    case 'NEW_MODELS':
      var updateObj = {};
      updateObj[action.modelType] = action.payload;
        return Object.assign({}, state, updateObj);
     }
  return state;
}