import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ClubsState } from '../context/clubs/ClubsState';
import { OrdersState } from '../context/orders/OrdersState';
import { PlayersState } from '../context/players/PlayersState';
import { ReportsState } from '../context/reports/ReportsState';
import { UsersState } from '../context/users/UsersState';
import { AccessManagementPage } from '../pages/AccessManegement/AccessManagementPage';
import { ClubsPage } from '../pages/Clubs/ClubsPage';
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
import { MainTemplate } from '../templates/MainTemplate';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/confirm/:confirmationCode" component={WelcomePage} />
        <MainTemplate>
          <ClubsState>
            <PlayersState>
              <OrdersState>
                <ReportsState>
                  <UsersState>
                    <ProtectedRoute
                      exact
                      path="/"
                      allowedRoles={['admin', 'playmaker-scout', 'scout']}
                    >
                      <HomePage />
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
                    <ProtectedRoute
                      path="/accessmanagement"
                      allowedRoles={['admin']}
                    >
                      <AccessManagementPage />
                    </ProtectedRoute>
                  </UsersState>
                </ReportsState>
              </OrdersState>
            </PlayersState>
          </ClubsState>
        </MainTemplate>
      </Switch>
    </Router>
  );
};
