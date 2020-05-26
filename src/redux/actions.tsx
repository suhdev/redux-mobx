import { v4 } from "uuid";
export const ADD_TODO = "todos/add";
export const REMOVE_TODO = "todos/remove";
export const SET_TODO_DONE = "todos/set_done";
export const SET_TODO_TEXT = "todos/set_text";

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    text,
    isDone: false,
    id: v4()
  }
});

export const removeTodo = (id: string) => ({
  type: REMOVE_TODO,
  payload: id
});

export const setTodoDone = (id: string, isDone: boolean) => ({
  type: SET_TODO_DONE,
  payload: {
    id,
    isDone
  }
});

export const setTodoText = (id: string, text: string) => ({
  type: SET_TODO_TEXT,
  payload: {
    id,
    text
  }
});
