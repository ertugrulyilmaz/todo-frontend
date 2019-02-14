import axios from 'axios';
import configs from '../configs/';

const login = data => {
  return axios.post(configs.user.endpoint + '/login', data);
};

const logout = () => {
  return axios.post(configs.user.endpoint + '/logout');
};

const register = data => {
  return axios.post(configs.user.endpoint + '/register', data);
};

const check = token => {
  let headers = { Authorization: 'Bearer ' + token };
  return axios.head(configs.user.endpoint + '/check', { headers });
};

export const userService = {
  login,
  logout,
  register,
  check
};
