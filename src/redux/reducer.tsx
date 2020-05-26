import { ITodo, IActionWithPayload } from "../common/types";
import { ADD_TODO, REMOVE_TODO, SET_TODO_DONE, SET_TODO_TEXT } from "./actions";

const initialState: ITodo[] = [];

export function reducer(state = initialState, action: IActionWithPayload<any>) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      if (state.find(e => e.id === action.payload)) {
        return state.filter(e => e.id !== action.payload);
      }
      return state;
    case SET_TODO_DONE:
    case SET_TODO_TEXT:
      const todoIndex = state.findIndex(t => t.id === action.payload.id);
      if (todoIndex === -1) {
        return state;
      }
      const todo = state[todoIndex];
      const newState = state.slice();
      newState[todoIndex] = {
        ...todo,
        isDone:
          action.type === SET_TODO_DONE ? action.payload.isDone : todo.isDone,
        text: action.type === SET_TODO_TEXT ? action.payload.text : todo.text
      };
      return newState;
    default:
      return state;
  }
}
