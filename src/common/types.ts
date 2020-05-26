import { Action } from "redux";

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

export interface IActionWithPayload<TPayload = any> extends Action {
  payload: TPayload;
}
