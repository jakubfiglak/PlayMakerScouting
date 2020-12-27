import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { Alerts } from './components/Alerts';
import { ErrorFallback } from './components/ErrorFallback';
import theme from './theme/theme';
import { useAuthState } from './context/auth/useAuthState';

const App = () => {
  const { token } = useAuthState();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <Alerts />
        {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
