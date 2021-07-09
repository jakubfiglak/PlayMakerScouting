import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { AppRoutes } from './routes/AppRoutes';
import { OrdersState } from './context/orders/OrdersState';
import { PlayersState } from './context/players/PlayersState';
import { ReportsState } from './context/reports/ReportsState';
import { UsersState } from './context/users/UsersState';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Alerts />
          <PlayersState>
            <OrdersState>
              <ReportsState>
                <UsersState>
                  <AppRoutes />
                </UsersState>
              </ReportsState>
            </OrdersState>
          </PlayersState>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
