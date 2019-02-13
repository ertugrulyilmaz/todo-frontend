import axios from 'axios';
import configs from '../configs/';

const login = data => {
  return axios.post(configs.member.endpoint + '/v1/auth/login', data);
};

const logout = () => {
  return axios.post(configs.member.endpoint + '/v1/auth/logout');
};

const register = data => {
  return axios.post(configs.member.endpoint + '/v1/auth/register', data);
};

const verifyRegister = data => {
  return axios.patch(
    configs.member.endpoint + '/v1/auth/register/verify',
    data
  );
};

const forgotPassword = data => {
  return axios.post(configs.member.endpoint + '/forgot-password', data);
};

const verifyPassword = data => {
  return axios.patch(configs.member.endpoint + '/forgot-password/verify', data);
};

const check = token => {
  let headers = { Authorization: 'Bearer ' + token };
  return axios.head(configs.member.endpoint + '/v1/members/check', { headers });
};

export const userService = {
  login,
  logout,
  register,
  verifyRegister,
  forgotPassword,
  verifyPassword,
  check
};
