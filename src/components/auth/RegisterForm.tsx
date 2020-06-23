import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const RegisterForm: React.FC = () => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
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
