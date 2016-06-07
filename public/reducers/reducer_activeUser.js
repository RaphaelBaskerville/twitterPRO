import { LOGIN_SUCCESS } from '../actions/login';

export default function (state = {}, action) {
  
  switch(action.type) {
    case LOGIN_SUCCESS:
    console.log('updating active USER',[action.user]);
    var updateObj = {};
    updateObj[action.modelType] = action.payload;
      return action.user
  }
  return state;
}