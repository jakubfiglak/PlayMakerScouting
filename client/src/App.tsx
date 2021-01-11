import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { useAuthState } from './context/auth/useAuthState';

const App = () => {
  const { loadUser, user, token } = useAuthState();

  useEffect(() => {
    if (!user && token) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <ThemeProvider theme={theme}>
        <Alerts />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
