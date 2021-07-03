import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AlertsState } from './context/alerts/AlertsState';
import { AuthState } from './context/auth/AuthState';
import { SettingsState } from './context/settings/SettingsState';

ReactDOM.render(
  <React.StrictMode>
    <AlertsState>
      <AuthState>
        <SettingsState>
          <App />
        </SettingsState>
      </AuthState>
    </AlertsState>
  </React.StrictMode>,
  document.getElementById('root'),
);
