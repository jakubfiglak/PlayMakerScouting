import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AccessManagementPage } from './pages/AccessManegement/AccessManagementPage';
import { ClubsPage } from './pages/Clubs/ClubsPage';
import { HomePage } from './pages/Home/HomePage';
import { OrdersPage } from './pages/Orders/OrdersPage';
import { PlayersPage } from './pages/Players/PlayersPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { ReportPage } from './pages/Report/ReportPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { SimplifiedDataState } from './context/simplifiedData/SimplifiedDataState';
import { useAuthState } from './context/auth/useAuthState';
import { PlayersState } from './context/players/PlayersState';
import { UsersState } from './context/users/UsersState';
import { ClubsState } from './context/clubs/ClubsState';
import { OrdersState } from './context/orders/OrdersState';
import { ReportsState } from './context/reports/ReportsState';

export const AuthenticatedApp = () => {
  const { loadUser, user } = useAuthState();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SimplifiedDataState>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/account" component={ProfilePage} />
          <ClubsState>
            <PlayersState>
              <Route exact path="/players" component={PlayersPage} />
              <Route exact path="/clubs" component={ClubsPage} />
              <OrdersState>
                <Route exact path="/orders" component={OrdersPage} />
              </OrdersState>
              <ReportsState>
                <Route exact path="/reports" component={ReportsPage} />
                <Route exact path="/reports/:id" component={ReportPage} />
              </ReportsState>
              <UsersState>
                <Route
                  exact
                  path="/accessmanagement"
                  component={AccessManagementPage}
                />
              </UsersState>
            </PlayersState>
          </ClubsState>
        </Switch>
      </Router>
    </SimplifiedDataState>
  );
};
