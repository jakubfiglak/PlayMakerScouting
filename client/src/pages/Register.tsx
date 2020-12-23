import React from 'react';
import AuthTemplate from '../templates/AuthTemplate';
import { RegisterForm } from '../components/forms';

export const Register = () => {
  return (
    <AuthTemplate title="Rejestracja">
      <RegisterForm />
    </AuthTemplate>
  );
};
