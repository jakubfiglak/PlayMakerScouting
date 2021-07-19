import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
// Custom components
import { LoginForm } from './LoginForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

type LocationState = { from?: LocationDescriptorObject };

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState | undefined>();
  const { login, loading, isAuthenticated } = useAuthState();

  const redirectURL = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated()) {
      setTimeout(() => {
        history.push(redirectURL);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AuthTemplate title="Logowanie">
      {loading && <Loader />}
      <LoginForm onSubmit={login} />
    </AuthTemplate>
  );
};
