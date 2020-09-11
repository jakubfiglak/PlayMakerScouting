import React from 'react';
import AuthTemplate from '../templates/AuthTemplate/AuthTemplate';
import { LoginForm } from '../forms';

export const Login = () => {
  return (
    <AuthTemplate title="Logowanie">
      <LoginForm />
    </AuthTemplate>
  );
};
