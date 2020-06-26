import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthState from '../context/auth/useAuthState';

const useAuthorization = (redirectTo = '/login') => {
  console.log('Checking authorization...');
  const history = useHistory();
  const authContext = useAuthState();

  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      history.push(redirectTo);
    }
  }, [isAuthenticated]);
};

export default useAuthorization;
