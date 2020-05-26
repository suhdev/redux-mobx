import { observable, action, computed } from "mobx";
import { ITodo } from "../common/types";
import { v4 } from "uuid";

export interface ITodoViewModel extends ITodo {
  setDone(val: boolean): void;
  setText(val: string): void;
}

export class TodoItemViewModel implements ITodo {
  @observable text: string = "";
  @observable isDone: boolean = false;
  @observable id: string = "";

  constructor(text: string, isDone: boolean = false) {
    this.id = v4();
    this.text = text;
    this.isDone = isDone;
  }

  @action.bound
  setDone(val: boolean) {
    this.isDone = val;
  }

  @action.bound
  setText(val: string) {
    this.text = val;
  }
}

export class TodoListViewModel {
  @observable.ref todos: ITodoViewModel[] = [];

  @computed get doneCount() {
    return this.todos.filter(e => e.isDone).length;
  }

  @action.bound
  addTodo(text: string) {
    this.todos = [...this.todos, new TodoItemViewModel(text)];
  }

  @action.bound
  removeTodo(id: string) {
    this.todos = this.todos.filter(e => e.id !== id);
  }
}
