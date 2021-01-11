import React from 'react';
import { LoginForm } from './LoginForm';
import { AuthTemplate } from '../../templates/AuthTemplate';

export const LoginPage = () => {
  return (
    <AuthTemplate title="Logowanie">
      <LoginForm />
    </AuthTemplate>
  );
};
