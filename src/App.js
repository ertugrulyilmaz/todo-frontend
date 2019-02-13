import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import messages_de from './translations/de.json';
import messages_en from './translations/en-US.json';

import { history } from './helpers';
import { WaitingComponent } from './components/WaitingComponent';
import { AuthorizedLayout } from './components/AuthorizedLayout';

import Exception from './pages/Exception/';
import LoginPage from './pages/LoginPage/';
import RegisterPage from './pages/RegisterPage/';

const messages = {
  de: messages_de,
  en: messages_en,
  'en-US': messages_en
};

@observer(['userStore', 'commonStore'])
export default class App extends React.Component {
  constructor(props) {
    super(props);

    addLocaleData([...en, ...de]);

    const language =
      localStorage.getItem('language') ||
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    this.props.commonStore.setLanguage(language);
  }

  render() {
    const { userStore, commonStore } = this.props;
    const language = commonStore.getLanguage;

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />

            <Route
              path="/admin"
              render={AuthorizedLayout(userStore, commonStore)}
            />

            <Route render={WaitingComponent(Exception)} />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}
