export default function (state = [10,20,30,40], action) {
  switch (action.type) {
    case "NEW_GRAPH_DATA":
    console.log('graph data', action.payload);
      let update = state.slice();
      update.push(action.payload);
      return update;
  }
  return state;
}