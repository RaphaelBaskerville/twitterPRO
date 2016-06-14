export default function(state = null, action) {
  switch(action.type) {
    case 'GROUP_SELECTED':
      return action.payload;
    case '__LISTS':
      console.log('REDUCING ACTIVE USER!!!!!!!!')
      if (state === null && action.payload.data) {
        console.log('//state is NULL action: ', action);
        console.log('//state is NULL action: ', action);
        console.log('//state is NULL action: ', action);
        return action.payload.data[0];
      }
  }

  return state;
}