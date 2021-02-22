import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AccessManagementPage } from '../pages/AccessManegement/AccessManagementPage';
import { ClubsPage } from '../pages/Clubs/ClubsPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { HomePage } from '../pages/Home/HomePage';
import { LoginPage } from '../pages/Login/LoginPage';
import { OrderPage } from '../pages/Order/OrderPage';
import { OrdersPage } from '../pages/Orders/OrdersPage';
import { PlayersPage } from '../pages/Players/PlayersPage';
import { ProfilePage } from '../pages/Profile/ProfilePage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { ReportPage } from '../pages/Report/ReportPage';
import { ReportsPage } from '../pages/Reports/ReportsPage';
import { WelcomePage } from '../pages/Welcome/WelcomePage';
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
          path="/players"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <PlayersPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/clubs"
          allowedRoles={['admin', 'playmaker-scout', 'scout']}
        >
          <ClubsPage />
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
        <ProtectedRoute path="/accessmanagement" allowedRoles={['admin']}>
          <AccessManagementPage />
        </ProtectedRoute>
        <Route path="*" component={FourOFourPage} />
      </Switch>
    </Router>
  );
};
