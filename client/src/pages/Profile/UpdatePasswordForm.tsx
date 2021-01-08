import React from 'react';
import { useFormik } from 'formik';
// MUI components
import { Grid, TextField, Button } from '@material-ui/core';
// Types
import { UpdatePasswordData } from '../../types/auth';
// Utils & data
import { updatePasswordInitialValues } from '../../components/forms/initialValues';
import { updatePasswordValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  onSubmit: (data: UpdatePasswordData) => void;
};

export const UpdatePasswordForm = ({ onSubmit }: Props) => {
  const formik = useFormik<UpdatePasswordData>({
    initialValues: updatePasswordInitialValues,
    validationSchema: updatePasswordValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { handleSubmit, errors, touched, getFieldProps } = formik;

  return (
    <form onSubmit={handleSubmit}>
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
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Zmień hasło
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
