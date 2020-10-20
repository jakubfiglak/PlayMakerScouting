import React, { useEffect } from 'react';
import { useFormik } from 'formik';
// MUI components
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
// Types
import { UpdatePasswordData } from '../../../types/auth';
// Hooks
import { useForm } from '../../../hooks';
import { useAuthState, useAlertsState } from '../../../context';
// Styles
import { useStyles } from './styles';
// Utils & data
import { updatePasswordInitialValues } from './initialValues';
import { updatePasswordValidationSchema } from './validationSchemas';
import { errorLabels, messageLabels } from '../../../data';
import { getLabel } from '../../../utils';

// const initialState: UpdatePasswordData = {
//   oldPassword: '',
//   newPassword: '',
//   newPasswordConfirm: '',
// };

export const UpdatePasswordForm = () => {
  const classes = useStyles();
  const authContext = useAuthState();
  const alertsContext = useAlertsState();

  const {
    loading,
    updatePassword,
    error,
    clearErrors,
    message,
    clearMessage,
  } = authContext;
  const { setAlert } = alertsContext;

  // // const [updatePasswordData, onInputChange, setPasswordData] = useForm(
  // //   initialState,
  // // );

  // const { oldPassword, newPassword, newPasswordConfirm } = updatePasswordData;

  // const onSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   updatePassword(updatePasswordData);
  //   setPasswordData(initialState);
  // };

  useEffect(() => {
    if (error) {
      setAlert(getLabel(error, errorLabels), 'error');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (message) {
      setAlert(getLabel(message, messageLabels), 'success');
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const formik = useFormik<UpdatePasswordData>({
    initialValues: updatePasswordInitialValues,
    validationSchema: updatePasswordValidationSchema,
    onSubmit: (values) => {
      updatePassword(values);
    },
  });

  const { handleSubmit, errors, touched, getFieldProps } = formik;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Bieżące hasło"
            type="password"
            id="oldPassword"
            {...getFieldProps('oldPassword')}
            error={touched.oldPassword && !!errors.oldPassword}
            helperText={touched.oldPassword && errors.oldPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nowe hasło"
            type="password"
            id="newPassword"
            {...getFieldProps('newPassword')}
            error={touched.newPassword && !!errors.newPassword}
            helperText={touched.newPassword && errors.newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Potwierdź nowe hasło"
            type="password"
            id="newPasswordConfirm"
            {...getFieldProps('newPasswordConfirm')}
            error={touched.newPasswordConfirm && !!errors.newPasswordConfirm}
            helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
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
