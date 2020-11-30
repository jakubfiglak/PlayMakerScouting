import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthState, AlertsState } from './context';

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
