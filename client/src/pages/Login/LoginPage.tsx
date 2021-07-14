import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Custom components
import { LoginForm } from './LoginForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

export const LoginPage = () => {
  const history = useHistory();
  const { login, loading, isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated()) {
      setTimeout(() => {
        history.push('/dashboard');
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
