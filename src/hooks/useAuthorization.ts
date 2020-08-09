import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../context/auth/useAuthState';

export const useAuthorization = (redirectTo = '/login') => {
  const history = useHistory();
  const authContext = useAuthState();

  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      history.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
};
