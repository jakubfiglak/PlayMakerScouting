import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { AppRoutes } from './routes/AppRoutes';
import { useAuthState } from './context/auth/useAuthState';

const App = () => {
  const { token, loadUser } = useAuthState();

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token]);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <ThemeProvider theme={theme}>
        <Alerts />
        <AppRoutes />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
