export default function(state = null, action) {
  switch(action.type) {
    case 'GROUP_SELECTED':
      return action.payload;
  }

  return state;
}