import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminPage } from '../pages/Admin/AdminPage';
import { ClubsPage } from '../pages/Clubs/ClubsPage';
import { ClubPage } from '../pages/Club/ClubPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { HomePage } from '../pages/Home/HomePage';
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
import { FourOFourPage } from '../pages/404/FourOFour';

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/confirm/:confirmationCode" component={WelcomePage} />
        <ProtectedRoute
          path="/dashboard"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <DashboardPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/account"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/players"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <PlayersPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/players/:id"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <PlayerPage />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/clubs"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ClubsPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/clubs/:id"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ClubPage />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/orders"
          allowedRoles={['admin', 'playmaker-scout']}
        >
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/orders/:id"
          allowedRoles={['admin', 'playmaker-scout']}
        >
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/reports"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ReportsPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reports/:id"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ReportPage />
        </ProtectedRoute>
        <ProtectedRoute path="/admin" allowedRoles={['admin']}>
          <AdminPage />
        </ProtectedRoute>
        <ProtectedRoute path="/teams/:id" allowedRoles={['admin']}>
          <TeamPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:id" allowedRoles={['admin']}>
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reporttemplates"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ReportTemplatesPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/settings"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <SettingsPage />
        </ProtectedRoute>
        <Route path="*" component={FourOFourPage} />
      </Switch>
    </Router>
  );
};
