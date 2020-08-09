import React from 'react';
import AuthTemplate from '../templates/AuthTemplate/AuthTemplate';
import { RegisterForm } from '../auth';

export const Register = () => {
  return (
    <AuthTemplate title="Rejestracja">
      <RegisterForm />
    </AuthTemplate>
  );
};
