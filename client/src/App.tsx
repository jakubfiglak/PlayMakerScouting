import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { useAuthState } from './context';
import { Alerts } from './components/common';
import theme from './theme/theme';

const App = () => {
  const { token } = useAuthState();

  return (
    <ThemeProvider theme={theme}>
      <Alerts />
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ThemeProvider>
  );
};

export default App;
