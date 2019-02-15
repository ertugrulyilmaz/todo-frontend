import { action, computed, observable } from 'mobx';
import { todoService } from '../services';

const uuidv4 = require('uuid/v4');

class TodoStore {
  @observable todos = [];

  @action
  init() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');

    todoService
      .getTodos()
      .then(res => {
        this.todos = res.data;
      })
      .catch(e => {
        console.log(e);
        this.todos = [];
      });
  }

  @action
  addTodo(item) {
    const todo = {
      id: uuidv4(),
      item,
      status: 'PENDING',
      createdAt: new Date().getTime()
    };

    this.todos = [todo, ...this.todos];

    localStorage.setItem('todos', JSON.stringify(this.todos));

    todoService.addTodo(todo);
  }

  @action
  removeTodo(id) {
    const todo = this.todos.filter(todo => todo.id === id);
    this.todos = this.todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(this.todos));

    todoService.deleteTodo(todo[0]);
  }

  toggleTodo(id, checked) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.status = checked ? 'COMPLETED' : 'PENDING';

        todoService.toggleTodo(todo);
      }

      return todo;
    });

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  @computed
  get getTodos() {
    return this.todos;
  }
}

export default new TodoStore();
