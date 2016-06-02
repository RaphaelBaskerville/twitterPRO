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
  }
  return state;
}