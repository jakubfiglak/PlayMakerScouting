import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AlertsState } from './context/alerts/AlertsState';
import { AuthState } from './context/auth/AuthState';

ReactDOM.render(
  <React.StrictMode>
    <AlertsState>
      <AuthState>
        <App />
      </AuthState>
    </AlertsState>
  </React.StrictMode>,
  document.getElementById('root'),
);
