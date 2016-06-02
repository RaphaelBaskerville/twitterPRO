export default function(state = null, action) {
  console.log('ACTION',action);
  switch(action.type) {
    case 'GROUP_SELECTED':
      return action.payload;
  }

  return state;
}