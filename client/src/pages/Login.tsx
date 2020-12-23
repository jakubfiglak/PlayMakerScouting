import React from 'react';
import AuthTemplate from '../templates/AuthTemplate';
import { LoginForm } from '../components/forms';

export const Login = () => {
  return (
    <AuthTemplate title="Logowanie">
      <LoginForm />
    </AuthTemplate>
  );
};
