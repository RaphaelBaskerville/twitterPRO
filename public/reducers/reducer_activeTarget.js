import {TARGET_SELECTED} from '../actions/selectTarget';

export default function(state = null, action) {
  switch(action.type) {
    case TARGET_SELECTED: 
      return action.payload.data;
  }

  return state;
}