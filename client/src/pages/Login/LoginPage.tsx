import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Custom components
import { LoginForm } from './LoginForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';
import { useAlert } from '../../hooks/useAlert';

export const LoginPage = () => {
  const history = useHistory();
  const {
    login,
    loading,
    isAuthenticated,
    message,
    error,
    clearErrors,
    clearMessage,
  } = useAuthState();

  useAlert(message, 'success', clearMessage);
  useAlert(error, 'error', clearErrors);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  }, [isAuthenticated]);

  return (
    <AuthTemplate title="Logowanie">
      {loading && <Loader />}
      <LoginForm onSubmit={login} />
    </AuthTemplate>
  );
};
