import React from 'react';
import { Route } from 'react-router-dom';
import { AccessManagementPage } from '../pages/AccessManegement/AccessManagementPage';
import { UsersState } from '../context/users/UsersState';

export const AdminRoutes = () => {
  return (
    <>
      <UsersState>
        <Route
          exact
          path="/accessmanagement"
          component={AccessManagementPage}
        />
      </UsersState>
    </>
  );
};
