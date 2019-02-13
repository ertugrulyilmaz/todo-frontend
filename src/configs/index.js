const dev = {
  member: { endpoint: 'http://localhost:8081' }
};

const prod = {
  member: { endpoint: 'http://user.todoapp.io' }
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default {
  ...config
};
