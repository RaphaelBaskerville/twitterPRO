export function addData() {
  return {
    type:"NEW_GRAPH_DATA",
    payload: Math.floor(Math.random() * 50)
  };
}