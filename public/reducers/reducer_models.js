import {__MODELS,__LISTS,__TARGETS, __MESSAGES, __HASHTAGS } from '../actions/model';



export default function (state = {
  __LISTS:[],
  __TARGETS:[],
  __MESSAGES:[],
  __HASHTAGS:[]
}, action) {
  console.log('REDUCER Action', action);
  let updateObj = {};
  switch(action.type) {
    case __LISTS:
    case __HASHTAGS:
    case __MESSAGES:
    case __TARGETS:     
    updateObj[action.type] = action.payload.data;
    let updateState = Object.assign({}, state, updateObj);
    console.log('updating state to:', updateState);
        return updateState;
   }

  return state;
}