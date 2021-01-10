import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core';
// Types
import { LoginFormData } from '../../types/auth';
// Hooks
import { useAlert } from '../../hooks';
import { useAuthState } from '../../context/auth/useAuthState';
// Styles
import { useStyles } from './styles';
// Utils & data
import { errorLabels } from '../../data';
import { getLabel } from '../../utils';

export const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    login,
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

  useAlert(getLabel(error, errorLabels), 'error', clearErrors);

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const { handleSubmit, errors, touched, getFieldProps } = formik;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...getFieldProps('email')}
        error={touched.email && !!errors.email}
        helperText={touched.email && !!errors.email && errors.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        {...getFieldProps('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && !!errors.password && errors.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={loading}
      >
        Zaloguj się
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/forgotpassword" className={classes.link}>
            Zapomniałeś hasła?
          </Link>
        </Grid>
        <Grid item>
          <Link to="/register" className={classes.link}>
            Nie masz konta? Zarejestruj się
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

const validationSchema: yup.ObjectSchema<LoginFormData> = yup
  .object({
    email: yup
      .string()
      .email('Niepoprawny adres e-mail')
      .required('Podaj adres e-mail'),
    password: yup.string().required('Podaj hasło'),
  })
  .defined();
