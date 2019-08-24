import { INCREMENT, DECREMENT } from "../actions";

export default function counterReducer(state = 120, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
