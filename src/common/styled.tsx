import styled from "styled-components";

export const TodoListWrapper = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.25;
  margin-bottom: 10px;
`;

export const TodoCheckbox = styled.input`
  display: block;
  width: 20px;
`;

export const TodoText = styled.div<{ isDone?: boolean }>`
  flex-grow: 1;
  text-align: left;
  text-decoration: ${props => (props.isDone ? "strikethrough" : undefined)};
`;

export const TodoInput = styled.input`
  display: block;
  flex-grow: 1;
`;

export const TodoRemove = styled.button`
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
`;
