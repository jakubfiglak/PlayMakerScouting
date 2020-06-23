import React from 'react';
import AuthTemplate from '../templates/AuthTemplate/AuthTemplate';
import RegisterForm from '../auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <AuthTemplate title="Rejestracja">
      <RegisterForm />
    </AuthTemplate>
  );
};

export default Register;
