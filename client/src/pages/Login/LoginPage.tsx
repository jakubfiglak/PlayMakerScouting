import React from 'react';
// Custom components
import { LoginForm } from './LoginForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

export const LoginPage = () => {
  const { login, loading } = useAuthState();

  return (
    <AuthTemplate title="Logowanie">
      {loading && <Loader />}
      <LoginForm onSubmit={login} />
    </AuthTemplate>
  );
};
