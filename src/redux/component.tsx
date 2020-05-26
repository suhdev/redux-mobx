import React, {
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITodo } from "../common/types";
import { setTodoDone, setTodoText, addTodo, removeTodo } from "./actions";
import {
  TodoWrapper,
  TodoCheckbox,
  TodoInput,
  TodoText,
  TodoRemove,
  TodoListWrapper
} from "../common/styled";

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, doneCount } = useSelector<
    ITodo[],
    { todos: ITodo[]; doneCount: number }
  >(todos => ({
    todos,
    doneCount: todos.reduce((sum, todo) => sum + +todo.isDone, 0)
  }));

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
        dispatch(addTodo(text));
        setText("");
      }
    },
    [text, dispatch]
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
      <div>You have completed {doneCount} todos</div>
      <div>
        {todos.map(e => (
          <Todo todo={e} key={e.id} />
        ))}
      </div>
    </TodoListWrapper>
  );
};

export const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(() => todo.text);

  const onDoneChange = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      dispatch(setTodoDone(todo.id, checked));
    },
    [todo, dispatch]
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
      dispatch(setTodoText(todo.id, todo.text));
    }
  }, [isEditing, text, todo, dispatch]);

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
      <TodoRemove onClick={() => dispatch(removeTodo(todo.id))}>x</TodoRemove>
    </TodoWrapper>
  );
};
