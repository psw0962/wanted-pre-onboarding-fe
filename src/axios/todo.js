import clientAxios from '.';

export const postCreateTodo = (data) => {
  return clientAxios({
    method: 'POST',
    url: `todos`,
    data,
  });
};

export const getTodos = () => {
  return clientAxios({
    method: 'GET',
    url: 'todos',
  });
};

export const deleteTodo = (todoId) => {
  return clientAxios({
    method: 'DELETE',
    url: `todos/${todoId}`,
  });
};

export const updateTodo = (props) => {
  const { todoId, data } = props;

  return clientAxios({
    method: 'PUT',
    url: `todos/${todoId}`,
    data,
  });
};
