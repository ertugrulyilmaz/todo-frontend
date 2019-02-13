import { action, computed, observable } from 'mobx';
import { alert } from '../helpers';
import { userService } from '../services';
import { history } from '../helpers';

class UserStore {
  @observable profile = JSON.parse(localStorage.getItem('profile'));

  @action
  check() {
    let token = localStorage.getItem('token');
    if (token) {
      // userService
      //   .check(token)
      //   .then(() => {})
      //   .catch(error => {
      //     alert.error('Your session time is up. Please login again.');
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('profile');
      //     history.push('/');
      //   });
    } else {
      history.push('/');
    }
  }

  @action
  login(email, password) {
    return userService.login({ email, password }).then(response => {
      let { email, token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('profile', JSON.stringify(response.data));

        this.setProfile(response.data);

        history.push('/admin');
        alert.success('Welcome to TodoAPP');
      } else {
        this.logout(email);
      }
    });
  }

  @action
  logout() {
    userService.logout().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      history.push('/login');
    });
  }

  @action
  register(user) {
    userService
      .register(user)
      .then(() => {
        history.push('/');

        alert.success('Registration successful.');
      })
      .catch(error => alert.error(error.toString()));
  }

  @action
  setProfile(profile) {
    this.profile = profile;
  }

  @computed
  get fullName() {
    if (this.profile) {
      let { firstName, lastName } = this.profile;

      return `${firstName} ${lastName}`;
    } else {
      return '';
    }
  }
}

export default new UserStore();