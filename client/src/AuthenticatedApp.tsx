import React, { useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ClubsPage } from './pages/Clubs/ClubsPage';
import { HomePage } from './pages/Home/HomePage';
import { PlayersPage } from './pages/Players/PlayersPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { ReportPage } from './pages/Report/ReportPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { SimplifiedDataState } from './context/simplifiedData/SimplifiedDataState';
import { PlayersState } from './context/players/PlayersState';
import { ClubsState } from './context/clubs/ClubsState';
import { ReportsState } from './context/reports/ReportsState';
import { OrdersState } from './context/orders/OrdersState';
import { PlaymakerScoutRoutes } from './routes/PlaymakerScoutRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { useAuthenticatedUser } from './hooks/useAuthenticatedUser';
import { MainTemplate } from './templates/MainTemplate';
import {
  scoutNavElements,
  playmakerScoutNavElements,
  adminNavElements,
} from './components/nav/navItems';

export const AuthenticatedApp = () => {
  const user = useAuthenticatedUser();

  const navElements = useMemo(() => {
    if (user.role === 'admin') {
      return adminNavElements;
    }
    if (user.role === 'playmaker-scout') {
      return playmakerScoutNavElements;
    }
    return scoutNavElements;
  }, [user.role]);

  return (
    <SimplifiedDataState>
      <Router>
        <MainTemplate navElements={navElements}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/account" component={ProfilePage} />
            <ClubsState>
              <PlayersState>
                <Route exact path="/players" component={PlayersPage} />
                <Route exact path="/clubs" component={ClubsPage} />
                <OrdersState>
                  <ReportsState>
                    <Route exact path="/reports" component={ReportsPage} />
                    <Route exact path="/reports/:id" component={ReportPage} />
                  </ReportsState>
                  {(user.role === 'playmaker-scout' ||
                    user.role === 'admin') && <PlaymakerScoutRoutes />}
                </OrdersState>
                {user.role === 'admin' && <AdminRoutes />}
              </PlayersState>
            </ClubsState>
          </Switch>
        </MainTemplate>
      </Router>
    </SimplifiedDataState>
  );
};
