import React, { SyntheticEvent } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { useForm } from '../../hooks';
import { useAuthState } from '../../context';
import { EditAccountData } from '../../types/auth';

export const EditAccountForm = () => {
  const classes = useStyles();
  const authContext = useAuthState();

  const { loading, editDetails, user } = authContext;

  const initialState: EditAccountData = {
    phone: user?.phone,
    address: user?.address.city,
    activeRadius: user?.activeRadius,
  };

  const [editAccountData, onInputChange, setFormData] = useForm(initialState);

  const { phone, address, activeRadius } = editAccountData;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    editDetails(editAccountData);
  };

  const onCancel = () => {
    setFormData(initialState);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={2}>
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
            value={address}
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
            inputProps={{
              min: 0,
            }}
            helperText="Podaj maksymalną odległość w km, jaką możesz pokonać w celu obserwacji zawodnika"
            value={activeRadius}
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
        Zapisz zmiany
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onCancel}
      >
        Anuluj
      </Button>
    </form>
  );
};
