import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
// Hooks
import { useAlert } from '../../hooks';
import { useAuthState } from '../../context/auth/useAuthState';
// Types
import { RegisterFormData } from '../../types/auth';
// Styles
import { useStyles } from './styles';
// Utils & data
import { passwordValidationSchema } from '../../data/forms/validationSchemas';
import { getLabel } from '../../utils/getLabel';

export const RegisterForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    loading,
    isAuthenticated,
    error,
    clearErrors,
  } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  useAlert(getLabel(error), 'error', clearErrors);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={(data) => {
        register(data);
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                as={TextField}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Imię"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Nazwisko"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="email"
                as={TextField}
                variant="outlined"
                autoComplete="email"
                fullWidth
                label="E-mail"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Hasło"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="passwordConfirm"
                type="password"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Potwierdź hasło"
                error={touched.passwordConfirm && !!errors.passwordConfirm}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Zarejestruj się
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className={classes.link}>
                Jesteś już zarejestrowany? Zaloguj się
              </Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema: yup.ObjectSchema<RegisterFormData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    email: yup.string().email().required('Podaj adres e-mail'),
    password: passwordValidationSchema,
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();
