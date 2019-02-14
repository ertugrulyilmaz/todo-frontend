const dev = {
  user: { endpoint: 'http://localhost:8888/v1/auth' }
};

const prod = {
  user: { endpoint: 'http://user.todoapp.io' }
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default {
  ...config
};
