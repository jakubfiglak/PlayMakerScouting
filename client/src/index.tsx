import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AlertsState } from './context/alerts/AlertsState';
import { AuthState } from './context/auth/AuthState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertsState>
        <App />
      </AlertsState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root'),
);
