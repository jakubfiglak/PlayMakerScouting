import * as Sentry from '@sentry/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/core';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorPage}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Alerts />
          <AppRoutes />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  );
};

export default App;
