export default function (state = {
  list:[],
  target:[]
}, action) {
  
  switch(action.type) {
    case 'NEW_MODELS':
      console.log('action.payload NEW_MODELS',[action.modelType]);
      var updateObj = {};
      updateObj[action.modelType] = action.payload;
        return Object.assign({}, state, updateObj);
     case 'MODEL_CREATED':
     console.log('MODEL_CREATED');
      var updatedCollection = [action.payload].concat(state.lists)
      var updateObj = {};
      updateObj[action.modelType] = updatedCollection;
        return Object.assign({}, state, updateObj);
     }
  return state;
}