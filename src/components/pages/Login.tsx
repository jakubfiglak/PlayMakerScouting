import React from 'react';
import AuthTemplate from '../templates/AuthTemplate/AuthTemplate';
import LoginForm from '../auth/LoginForm';

const Login: React.FC = () => {
  return (
    <AuthTemplate title="Logowanie">
      <LoginForm />
    </AuthTemplate>
  );
};

export default Login;
