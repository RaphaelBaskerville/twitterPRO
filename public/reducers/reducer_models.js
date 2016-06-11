import {__MODELS,__LISTS,__TARGETS, __MESSAGES, __HASHTAGS } from '../actions/model';

export default function (state = {
  __LISTS:[],
  __TARGETS:[],
  __MESSAGES:[],
  __HASHTAGS:[]
}, action) {
  switch(action.type) {
    case __LISTS:
    case __HASHTAGS:
    case __MESSAGES:
    case __TARGETS:
      console.log('updating state ', action.type);     
      let updateObj = {};
      updateObj[action.type] = action.payload.data;
      return Object.assign({}, state, updateObj);
  }
  return state;
}