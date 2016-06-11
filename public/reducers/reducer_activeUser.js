import { GET_TWITTER_OBJ_FOR_PROFILE } from '../actions/model';
import { LOG_OUT_SUCCESS } from '../actions/logout';

export default function (state = JSON.parse(window.localStorage.getItem('user')) || null, action) {
  switch(action.type) {
    case GET_TWITTER_OBJ_FOR_PROFILE:
    console.log('USER AUTHENTICATED:', action.payload.data);
      return action.payload.data;
    case LOG_OUT_SUCCESS:
    console.log('USER DEACTIVATED');
      return null;
  }
  return state;
}