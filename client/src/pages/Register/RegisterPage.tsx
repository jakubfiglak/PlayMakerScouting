import React from 'react';
import { RegisterForm } from './RegisterForm';
import { AuthTemplate } from '../../templates/AuthTemplate';

export const RegisterPage = () => {
  return (
    <AuthTemplate title="Rejestracja">
      <RegisterForm />
    </AuthTemplate>
  );
};
