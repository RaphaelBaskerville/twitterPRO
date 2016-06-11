import { GET_TWITTER_OBJ_FOR_PROFILE } from '../actions/model';

export default function (state = {}, action) {
  
  switch(action.type) {
    case GET_TWITTER_OBJ_FOR_PROFILE:
    console.log('Login action', action.payload.data);
    var updateObj = {};
    updateObj[action.modelType] = action.payload.data;
      return action.payload.data;
  }
  return state;
}