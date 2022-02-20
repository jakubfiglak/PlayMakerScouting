import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminPage } from '../pages/Admin/AdminPage';
import { ClubsPage } from '../pages/Clubs/ClubsPage';
import { ClubPage } from '../pages/Club/ClubPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { HomePage } from '../pages/Landing/HomePage';
import { ClubScoutingPage } from '../pages/Landing/Scouting/ClubScoutingPage';
import { ScoutingAcademyPage } from '../pages/Landing/Academy/ScoutingAcademyPage';
import { ScoutingAppPage } from '../pages/Landing/App/ScoutingAppPage';
import { DataAnalysisPage } from '../pages/Landing/Data/DataAnalysisPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { OrderPage } from '../pages/Order/OrderPage';
import { OrdersPage } from '../pages/Orders/OrdersPage';
import { PlayerPage } from '../pages/Player/PlayerPage';
import { PlayersPage } from '../pages/Players/PlayersPage';
import { ProfilePage } from '../pages/Profile/ProfilePage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { ReportPage } from '../pages/Report/ReportPage';
import { ReportsPage } from '../pages/Reports/ReportsPage';
import { WelcomePage } from '../pages/Welcome/WelcomePage';
import { ReportTemplatesPage } from '../pages/ReportTemplates/ReportTemplatesPage';
import { TeamPage } from '../pages/Team/TeamPage';
import { UserPage } from '../pages/User/UserPage';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { MatchesPage } from '../pages/Matches/MatchesPage';
import { MatchPage } from '../pages/Match/MatchPage';
import { NotesPage } from '../pages/Notes/NotesPage';
import { NotePage } from '../pages/Note/NotePage';
import { FourOFourPage } from '../pages/404/FourOFour';
import { MainTemplate } from '../templates/MainTemplate';
import { ForgotPasswordPage } from '../pages/PasswordReset/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/PasswordReset/ResetPasswordPage';

const regularUserProtectedRoutes = [
  '/dashboard',
  '/account',
  '/players',
  '/players/:id',
  '/clubs',
  '/clubs/:id',
  '/reports',
  '/reports/:id',
  '/notes',
  '/notes/:id',
  '/matches',
  '/matches/:id',
  '/reporttemplates',
  '/settings',
];
const privilegedUserProtectedRoutes = ['/orders', '/orders/:id'];
const adminProtectedRoutes = ['/admin', 'teams/:id', '/users/:id'];

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/club-scouting" component={ClubScoutingPage} />
        <Route path="/scouting-app" component={ScoutingAppPage} />
        <Route path="/scouting-academy" component={ScoutingAcademyPage} />
        <Route path="/data-analysis" component={DataAnalysisPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgotpassword" component={ForgotPasswordPage} />
        <Route path="/resetpassword/:token" component={ResetPasswordPage} />
        <Route path="/confirm/:confirmationCode" component={WelcomePage} />
        <ProtectedRoute
          exact
          path={regularUserProtectedRoutes}
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <MainTemplate>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/account">
              <ProfilePage />
            </Route>
            <Route exact path="/players">
              <PlayersPage />
            </Route>
            <Route path="/players/:id">
              <PlayerPage />
            </Route>
            <Route exact path="/clubs">
              <ClubsPage />
            </Route>
            <Route path="/clubs/:id">
              <ClubPage />
            </Route>
            <Route exact path="/reports">
              <ReportsPage />
            </Route>
            <Route path="/reports/:id">
              <ReportPage />
            </Route>
            <Route path="/reporttemplates">
              <ReportTemplatesPage />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route exact path="/matches">
              <MatchesPage />
            </Route>
            <Route path="/matches/:id">
              <MatchPage />
            </Route>
            <Route exact path="/notes">
              <NotesPage />
            </Route>
            <Route path="/notes/:id">
              <NotePage />
            </Route>
          </MainTemplate>
        </ProtectedRoute>
        <ProtectedRoute
          path={privilegedUserProtectedRoutes}
          exact
          allowedRoles={['admin', 'playmaker-scout']}
        >
          <MainTemplate>
            <Route exact path="/orders">
              <OrdersPage />
            </Route>
            <Route path="/orders/:id">
              <OrderPage />
            </Route>
          </MainTemplate>
        </ProtectedRoute>
        <ProtectedRoute
          path={adminProtectedRoutes}
          exact
          allowedRoles={['admin']}
        >
          <MainTemplate>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/teams/:id">
              <TeamPage />
            </Route>
            <Route path="/users/:id">
              <UserPage />
            </Route>
          </MainTemplate>
        </ProtectedRoute>
        <Route path="*" component={FourOFourPage} />
      </Switch>
    </Router>
  );
};
