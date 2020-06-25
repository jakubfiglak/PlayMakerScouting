import React, { SyntheticEvent } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { LoginFormData } from './types';
import useForm from '../../hooks/useForm';
import useAuthState from '../../context/auth/useAuthState';

const initialState: LoginFormData = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const context = useAuthState();

  const { login } = context;

  const [loginData, onInputChange] = useForm(initialState);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    login(loginData);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={onInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onInputChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Zaloguj się
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

export default LoginForm;
