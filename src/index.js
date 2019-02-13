import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import UserStore from './stores/UserStore';
import CommonStore from './stores/CommonStore';
import TodoStore from './stores/TodoStore';
import * as serviceWorker from './serviceWorker';

import './index.css';

require('./services/config');

const stores = {
  userStore: UserStore,
  commonStore: CommonStore,
  todoStore: TodoStore
};

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
