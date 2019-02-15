import axios from 'axios';
import configs from '../configs/';

const getTodos = () => {
  return axios.get(configs.todo.endpoint);
};

const addTodo = data => {
  return axios.post(configs.todo.endpoint, data);
};

const deleteTodo = data => {
  return axios({ url: configs.todo.endpoint, method: 'delete', data });
};

const toggleTodo = data => {
  return axios.put(configs.todo.endpoint, data);
};

export const todoService = {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo
};
