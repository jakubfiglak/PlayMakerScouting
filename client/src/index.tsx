import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import { AlertsState } from './context/alerts/AlertsState';
import { AuthState } from './context/auth/AuthState';
import { SettingsState } from './context/settings/SettingsState';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

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
