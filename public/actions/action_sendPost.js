import { postModel, POST_SUCCESS } from './model';

export function createList(payload, state) {
  console.log('CreateList payload: ', payload, 'state: ', state);
  return postModel('list', POST_SUCCESS, {name:payload.name, user:state.username});
}

// type,options,action, payload