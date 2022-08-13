import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Font from '../../components/font';
import TodoList from '../../components/todo-list';
import { postCreateTodo, getTodos, deleteTodo, updateTodo } from '../../axios/todo';

const Todo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [createTodoText, setcreateTodoText] = useState('');
  const [todos, setTodos] = useState(null);

  const refetchTodos = () => {
    return getTodos().then((res) => setTodos(res.data));
  };

  const submitCreateTodo = async (props) => {
    try {
      await postCreateTodo(props).then(() => {
        setcreateTodoText('');
        refetchTodos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId).then(() => {
        refetchTodos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCompleteButton = async (props) => {
    try {
      await updateTodo(props).then(() => {
        refetchTodos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 리다이렉트
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const getTodoData = async () => {
      const todoData = await getTodos();
      setTodos(todoData.data);
    };

    getTodoData();
  }, []);

  return (
    <>
      {todos && (
        <Frame>
          <Font size={32}>Todo List</Font>

          <LogoutWrapper>
            <Button
              type="button"
              color="#000"
              onClick={() => {
                localStorage.removeItem('access_token');
                alert('로그아웃 되었습니다.');
                navigate('/');
                window.location.reload();
              }}
            >
              로그아웃
            </Button>
          </LogoutWrapper>

          <ListFrame>
            <CreateTodoWrapper>
              <Font size={18}>할일</Font>
              <CustomInput
                type="text"
                value={createTodoText}
                onChange={(e) => {
                  e.preventDefault();

                  setcreateTodoText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (createTodoText !== '') {
                      submitCreateTodo({ todo: createTodoText });
                    }
                  }
                }}
              />
              <Button
                type="button"
                color="#0004E3"
                onClick={() => {
                  if (createTodoText !== '') {
                    submitCreateTodo({ todo: createTodoText });
                  }
                }}
              >
                추가
              </Button>
            </CreateTodoWrapper>

            <Line />

            <div>
              {todos.length > 0 ? (
                todos.map((todo) => {
                  return (
                    <ListWrapper key={todo.id}>
                      <TodoList
                        todos={todos}
                        todo={todo}
                        onClickDeleteTodo={onClickDeleteTodo}
                        onClickCompleteButton={onClickCompleteButton}
                        refetchTodos={refetchTodos}
                      />
                    </ListWrapper>
                  );
                })
              ) : (
                <NoTodoList>
                  <Font size={16}>등록한 할 일이 없습니다.</Font>
                </NoTodoList>
              )}
            </div>
          </ListFrame>
        </Frame>
      )}
    </>
  );
};

export default Todo;

// frame
const Frame = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const ListFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;

  margin-top: 40px;
  border: 1px solid #000;
  border-radius: 20px;
`;

// wrapper
const CreateTodoWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const LogoutWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`;

// component
const Line = styled.hr`
  width: 100%;
  margin: 18px 0px;
  color: #777;
`;

const CustomInput = styled.input`
  border: 1px solid #000;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 20px;
  color: #fff;
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  cursor: pointer;
`;

const NoTodoList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
