import {TARGET_PROFILE_SELECTED} from '../actions/model';

export default function(state = null, action) {
  console.log('ACTION',action);
  switch(action.type) {
    case TARGET_PROFILE_SELECTED: 
      return action.payload;
  }

  return state;
}