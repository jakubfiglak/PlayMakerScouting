import React from 'react';
import AuthTemplate from '../../templates/AuthTemplate';
import { LoginForm } from '../../components/forms';

export const LoginPage = () => {
  return (
    <AuthTemplate title="Logowanie">
      <LoginForm />
    </AuthTemplate>
  );
};
