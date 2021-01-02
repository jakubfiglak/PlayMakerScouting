import React from 'react';
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
import { PlaymakerScoutRoutes } from './routes/PlaymakerScoutRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { useAuthenticatedUser } from './hooks/useAuthenticatedUser';

export const AuthenticatedApp = () => {
  const user = useAuthenticatedUser();

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
              <ReportsState>
                <Route exact path="/reports" component={ReportsPage} />
                <Route exact path="/reports/:id" component={ReportPage} />
              </ReportsState>
              {user.role === 'playmaker-scout' && <PlaymakerScoutRoutes />}
              {user.role === 'admin' && (
                <>
                  <PlaymakerScoutRoutes />
                  <AdminRoutes />
                </>
              )}
            </PlayersState>
          </ClubsState>
        </Switch>
      </Router>
    </SimplifiedDataState>
  );
};
