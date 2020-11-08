import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../context/auth/useAuthState';
import { UserRole } from '../types/auth';

export const useAuthorization = (redirectTo = '/login', role?: UserRole) => {
  const history = useHistory();
  const authContext = useAuthState();

  const { loadUser, isAuthenticated, user } = authContext;

  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      history.push(redirectTo);
    }
    if (role && user?.role !== role) {
      history.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
};
