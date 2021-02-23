import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Alerts } from './components/Alerts';
import { ErrorPage } from './pages/Error/ErrorPage';
import theme from './theme/theme';
import { AppRoutes } from './routes/AppRoutes';
import { ClubsState } from './context/clubs/ClubsState';
import { OrdersState } from './context/orders/OrdersState';
import { PlayersState } from './context/players/PlayersState';
import { ReportsState } from './context/reports/ReportsState';
import { UsersState } from './context/users/UsersState';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <ThemeProvider theme={theme}>
        <Alerts />
        <ClubsState>
          <PlayersState>
            <OrdersState>
              <ReportsState>
                <UsersState>
                  <AppRoutes />
                </UsersState>
              </ReportsState>
            </OrdersState>
          </PlayersState>
        </ClubsState>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
