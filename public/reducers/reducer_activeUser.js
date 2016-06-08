import { LOGIN_SUCCESS } from '../actions/login';

export default function (state = {}, action) {
  
  switch(action.type) {
    case LOGIN_SUCCESS:
    var updateObj = {};
    updateObj[action.modelType] = action.payload;
      return action.user
  }
  return state;
}