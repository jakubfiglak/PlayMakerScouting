import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
// Types
import { UpdatePasswordData } from '../../types/auth';
// Utils & data
import { updatePasswordInitialValues } from '../../components/forms/initialValues';
import { updatePasswordValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  onSubmit: (data: UpdatePasswordData) => void;
};

export const UpdatePasswordForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={updatePasswordInitialValues}
      onSubmit={(data) => onSubmit(data)}
      validationSchema={updatePasswordValidationSchema}
    >
      {({ errors, touched }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="oldPassword"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Bieżące hasło"
                type="password"
                id="oldPassword"
                error={touched.oldPassword && !!errors.oldPassword}
                helperText={touched.oldPassword && errors.oldPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="newPassword"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nowe hasło"
                type="password"
                id="newPassword"
                error={touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="newPasswordConfirm"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Potwierdź nowe hasło"
                type="password"
                id="newPasswordConfirm"
                error={
                  touched.newPasswordConfirm && !!errors.newPasswordConfirm
                }
                helperText={
                  touched.newPasswordConfirm && errors.newPasswordConfirm
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Zmień hasło
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  form: {
    width: '100%',
  },
}));
