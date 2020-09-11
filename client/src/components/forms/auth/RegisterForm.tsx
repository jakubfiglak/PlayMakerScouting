import React, { useEffect, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
// MUI components
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
// Custom components
import { AddressFieldset } from '../fieldsets';
// Hooks
import { useForm } from '../../../hooks';
import { useAuthState } from '../../../context';
// Types
import { RegisterFormData } from '../../../types/auth';
// Styles
import { useStyles } from './styles';

const initialState: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  streetNo: '',
  zipCode: '',
  city: '',
  voivodeship: '',
  country: '',
  activeRadius: 0,
  password: '',
  passwordConfirm: '',
};

export const RegisterForm = () => {
  const classes = useStyles();
  const authContext = useAuthState();
  const history = useHistory();

  const { register, loading, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const [registerData, onInputChange] = useForm(initialState);

  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    streetNo,
    zipCode,
    city,
    voivodeship,
    country,
    activeRadius,
    password,
    passwordConfirm,
  } = registerData;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formattedRegisterData = {
      firstName,
      lastName,
      email,
      phone,
      address: {
        street,
        streetNo,
        zipCode,
        city,
        voivodeship,
        country,
      },
      activeRadius,
      password,
      passwordConfirm,
    };

    register(formattedRegisterData);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Imię"
            autoFocus
            value={firstName}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Nazwisko"
            name="lastName"
            autoComplete="lname"
            value={lastName}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="phone"
            label="Nr telefonu"
            name="phone"
            autoComplete="phone"
            type="tel"
            helperText="np. 123456789 (bez myślników)"
            value={phone}
            onChange={onInputChange}
          />
        </Grid>
        <AddressFieldset
          streetValue={street}
          streetNoValue={streetNo}
          zipCodeValue={zipCode}
          cityValue={city}
          voivodeshipValue={voivodeship}
          countryValue={country}
          onChange={onInputChange}
        />
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="activeRadius"
            label="Promień działania"
            name="activeRadius"
            type="number"
            inputProps={{
              min: 0,
            }}
            helperText="Podaj maksymalną odległość w km, jaką możesz pokonać w celu obserwacji zawodnika"
            value={activeRadius}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            value={password}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="passwordConfirm"
            label="Potwierdź hasło"
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onInputChange}
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
    </form>
  );
};
