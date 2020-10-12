import React, { SyntheticEvent } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { useForm } from '../../../hooks';
import { useAuthState } from '../../../context';
import { UpdatePasswordData } from '../../../types/auth';

const initialState: UpdatePasswordData = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const UpdatePasswordForm = () => {
  const classes = useStyles();
  const authContext = useAuthState();

  const { loading, updatePassword } = authContext;

  const [updatePasswordData, onInputChange, setPasswordData] = useForm(
    initialState,
  );

  const { oldPassword, newPassword, newPasswordConfirm } = updatePasswordData;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updatePassword(updatePasswordData);
    setPasswordData(initialState);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="oldPassword"
            label="Bieżące hasło"
            type="password"
            id="oldPassword"
            onChange={onInputChange}
            value={oldPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="newPassword"
            label="Nowe hasło"
            type="password"
            id="newPassword"
            onChange={onInputChange}
            value={newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="newPasswordConfirm"
            label="Potwierdź nowe hasło"
            type="password"
            id="newPasswordConfirm"
            onChange={onInputChange}
            value={newPasswordConfirm}
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
        Zmień hasło
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </form>
  );
};
