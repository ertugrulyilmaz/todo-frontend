import { action, computed, observable } from 'mobx';
const uuidv4 = require('uuid/v4');

class TodoStore {
  @observable todos = [];

  @action
  init() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  @action
  addTodo(value) {
    this.todos = [
      {
        id: uuidv4(),
        checked: false,
        value,
        time: new Date().getTime()
      },
      ...this.todos
    ];

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  @action
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  toggleTodo(id, checked) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.checked = checked;
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
