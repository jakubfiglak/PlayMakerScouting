import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthState } from '../context/auth/useAuthState';
import { UserRole } from '../types/auth';

type Props = {
  allowedRoles: UserRole[];
} & RouteProps;

export const ProtectedRoute: FC<Props> = ({
  children,
  allowedRoles,
  ...rest
}) => {
  const { isAuthenticated, user } = useAuthState();

  const isAllowed = isAuthenticated && user && allowedRoles.includes(user.role);

  return (
    <Route
      {...rest}
      render={() => (isAllowed ? <>{children}</> : <Redirect to="/login" />)}
    />
  );
};
