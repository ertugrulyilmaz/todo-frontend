const dev = {
  user: { endpoint: 'http://localhost:8888/v1/auth' },
  todo: { endpoint: 'http://localhost:8888/v1/todo' }
};

const prod = {
  user: { endpoint: 'http://user.todoapp.io' },
  todo: { endpoint: 'http://todo.todoapp.io' }
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default {
  ...config
};
