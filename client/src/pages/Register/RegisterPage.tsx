import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Typography, Link } from '@material-ui/core';
// Custom components
import { RegisterForm } from './RegisterForm';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';

export const RegisterPage = () => {
  const { loading, register } = useAuthState();

  return (
    <AuthTemplate title="Rejestracja">
      {loading && <Loader />}
      <Typography align="center" gutterBottom>
        Przepraszamy, rejestracja nowych użytkowników w wersji testowej
        aplikacji jest zablokowana
      </Typography>
      <Link component={RouterLink} to="/login">
        Wróć do strony logowania
      </Link>
      {/* <RegisterForm onSubmit={register} /> */}
    </AuthTemplate>
  );
};
