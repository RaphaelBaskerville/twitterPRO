import axios from 'axios';

export const TARGET_SELECTED = 'TARGET_SELECTED';

export function selectTarget(handle) {
  let request = axios.post('/userObj', {handle:handle});
  return {
    type: TARGET_SELECTED,
    payload: request
  };
}


export function deleteModel (key, value, type) {
  let request = axios.delete('api/models/'+type + '/' + key + '/' + value, {});
  return {
    type:MODEL_DELETED,
    payload: request
  };
}