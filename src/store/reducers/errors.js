export default function errors(state = [], action) {
  const ADD_ERROR = "ADD_ERROR";
  const REMOVE_ERROR = "REMOVE_ERROR";
  switch (action.type) {
    //TODO Solo añadir si no existe previamente (set?)
    case ADD_ERROR:
      return [...state, action.payload.error];

    case REMOVE_ERROR:
      let newState = [...state];
      newState.splice(action.payload.index, 1);
      return newState;

    default:
      return state;
  }
}
