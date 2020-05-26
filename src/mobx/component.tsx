import React, {
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect
} from "react";
import { observer } from "mobx-react";
import {
  TodoWrapper,
  TodoCheckbox,
  TodoInput,
  TodoText,
  TodoRemove,
  TodoListWrapper
} from "../common/styled";
import { TodoListViewModel, TodoItemViewModel } from "./viewmodel";

export const TodoList: React.FC = observer(() => {
  const [viewModel] = useState(() => new TodoListViewModel());

  const [text, setText] = useState("");

  const onTextChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setText(value);
    },
    [setText]
  );

  const onKeyUp = useCallback(
    (evt: KeyboardEvent<HTMLInputElement>) => {
      if (evt.which === 13) {
        viewModel.addTodo(text);
        setText("");
      }
    },
    [text, setText, viewModel]
  );

  return (
    <TodoListWrapper>
      <div>
        <input
          type="text"
          onKeyUp={onKeyUp}
          onChange={onTextChange}
          value={text}
          placeholder="press enter to add"
          style={{ display: "block", width: "100%" }}
        />
      </div>
      <div>You have completed {viewModel.doneCount} todos</div>
      <div>
        {viewModel.todos.map(e => (
          <Todo todo={e} todosListViewModel={viewModel} key={e.id} />
        ))}
      </div>
    </TodoListWrapper>
  );
});

export const Todo: React.FC<{
  todo: TodoItemViewModel;
  todosListViewModel: TodoListViewModel;
}> = observer(({ todo, todosListViewModel }) => {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(() => todo.text);

  const onDoneChange = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      todo.setDone(checked);
    },
    [todo]
  );

  const onTextChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setText(value);
    },
    [setText]
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.which === 13) {
        setEditing(false);
      } else if (e.which === 10) {
        setText(todo.text);
        setEditing(false);
      }
    },
    [setEditing, todo, setText]
  );

  useEffect(() => {
    if (isEditing) {
      return;
    }
    if (text !== todo.text) {
      todo.setText(todo.text);
    }
  }, [isEditing, text, todo]);

  return (
    <TodoWrapper>
      <TodoCheckbox
        type="checkbox"
        checked={todo.isDone}
        onChange={onDoneChange}
      />
      {isEditing ? (
        <TodoInput
          onKeyUp={onKeyUp}
          onChange={onTextChange}
          value={todo.text}
        />
      ) : (
        <TodoText
          as={todo.isDone ? "del" : "div"}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.text}
        </TodoText>
      )}
      <TodoRemove onClick={() => todosListViewModel.removeTodo(todo.id)}>
        x
      </TodoRemove>
    </TodoWrapper>
  );
});
