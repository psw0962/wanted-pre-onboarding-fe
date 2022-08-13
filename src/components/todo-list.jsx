import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { updateTodo } from '../axios/todo';
import Font from './font';

const TodoList = ({ todos, todo, onClickDeleteTodo, onClickCompleteButton, refetchTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTodoText, setUpdateTodoText] = useState(todo.todo);

  const onClickUpdateTodo = async (props) => {
    try {
      await updateTodo(props).then(() => {
        setIsEdit(false);
        refetchTodos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isEdit === false && (
        <CustomFont size={18} isCompleted={todo.isCompleted}>
          {todo.todo}
        </CustomFont>
      )}

      {isEdit === true && (
        <CustomInput
          type="text"
          defaultValue={todo.todo}
          onChange={(e) => {
            setUpdateTodoText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (updateTodoText !== '') {
                onClickUpdateTodo({ todoId: todo.id, data: { todo: updateTodoText, isCompleted: todo.isCompleted } });
              }
            }
          }}
        />
      )}

      <ButtonWrapper>
        {!isEdit && (
          <Button
            type="button"
            color="#777"
            onClick={() => {
              onClickCompleteButton({
                todoId: todo.id,
                data: { todo: todo.todo, isCompleted: !todo.isCompleted },
              });
            }}
          >
            완료
          </Button>
        )}

        {!isEdit && (
          <Button
            type="button"
            color="#0004E3"
            onClick={() => {
              if (todos.find((x) => x.id === todo.id)) {
                setIsEdit(true);
              }
            }}
          >
            수정
          </Button>
        )}

        {isEdit && (
          <Button
            type="button"
            color="#0004E3"
            onClick={() =>
              onClickUpdateTodo({ todoId: todo.id, data: { todo: updateTodoText, isCompleted: todo.isCompleted } })
            }
          >
            수정완료
          </Button>
        )}

        {!isEdit && (
          <Button type="button" color="#000" onClick={() => onClickDeleteTodo(todo.id)}>
            삭제
          </Button>
        )}

        {isEdit && (
          <Button
            type="button"
            color="#000"
            onClick={() => {
              if (todos.find((x) => x.id === todo.id)) {
                setIsEdit(false);
              }
            }}
          >
            취소
          </Button>
        )}
      </ButtonWrapper>
    </>
  );
};

export default TodoList;

const CustomFont = styled(Font)`
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : '')};
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 20px;
  color: #fff;
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CustomInput = styled.input`
  border: 1px solid #000;
`;
