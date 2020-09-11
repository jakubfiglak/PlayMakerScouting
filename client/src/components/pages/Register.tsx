import React from 'react';
import AuthTemplate from '../templates/AuthTemplate/AuthTemplate';
import { RegisterForm } from '../forms';

export const Register = () => {
  return (
    <AuthTemplate title="Rejestracja">
      <RegisterForm />
    </AuthTemplate>
  );
};
