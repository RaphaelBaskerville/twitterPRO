import { LOGIN_SUCCESS, LOG_OUT_SUCCESS } from '../actions/login';
import { GET_TWITTER_OBJ_FOR_PROFILE } from '../actions/model';


export default function (state = window.localStorage.getItem('id_token') ? true : false, action) {
  console.log(action.type);
  console.log(LOG_OUT_SUCCESS);
  switch (action.type) {
    case LOG_OUT_SUCCESS:
      console.log('reducer: ', LOG_OUT_SUCCESS);
      return false;
    case GET_TWITTER_OBJ_FOR_PROFILE:
      console.log('login-success reducer', action);
      return true;
  }
  return state;
}