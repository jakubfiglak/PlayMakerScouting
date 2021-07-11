import React from 'react';
import * as Sentry from '@sentry/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/core';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { AppRoutes } from './routes/AppRoutes';
import { OrdersState } from './context/orders/OrdersState';
import { ReportsState } from './context/reports/ReportsState';
import { UsersState } from './context/users/UsersState';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorPage}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Alerts />
          <OrdersState>
            <ReportsState>
              <UsersState>
                <AppRoutes />
              </UsersState>
            </ReportsState>
          </OrdersState>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  );
};

export default App;
