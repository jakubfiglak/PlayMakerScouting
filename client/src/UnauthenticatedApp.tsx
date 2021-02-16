import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom components
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { WelcomePage } from './pages/Welcome/WelcomePage';
// Hooks
import { useAuthState } from './context/auth/useAuthState';
import { useAlert } from './hooks/useAlert';
// Utils & data
import { getLabel } from './utils/getLabel';

export const UnauthenticatedApp = () => {
  const { message, error, clearMessage, clearErrors } = useAuthState();

  useAlert(getLabel(message), 'success', clearMessage);
  useAlert(getLabel(error), 'error', clearErrors);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/confirm/:confirmationCode" component={WelcomePage} />
      </Switch>
    </Router>
  );
};
