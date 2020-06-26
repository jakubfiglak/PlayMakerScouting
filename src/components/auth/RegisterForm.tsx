import React, { SyntheticEvent } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import useForm from '../../hooks/useForm';
import { RegisterFormData } from '../../types/auth';

const initialState: RegisterFormData = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  address: '',
  activeRadius: 0,
  password: '',
  passwordConfirm: '',
};

const RegisterForm: React.FC = () => {
  const classes = useStyles();

  const [registerData, onInputChange] = useForm(initialState);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(registerData);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Imię"
            autoFocus
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="surname"
            label="Nazwisko"
            name="surname"
            autoComplete="lname"
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
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="address"
            label="Adres"
            name="address"
            autoComplete="address"
            type="text"
            helperText="np. ul. Cicha 132/16 62-200 Gniezno"
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="activeRadius"
            label="Promień działania"
            name="activeRadius"
            type="number"
            helperText="Podaj maksymalną odległość w km, jaką możesz pokonać w celu obserwacji zawodnika"
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
      >
        Zarejestruj się
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

export default RegisterForm;
