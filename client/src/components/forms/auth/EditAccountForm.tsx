import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
// Custom components
import { AddressFieldset } from '../fieldsets';
// Hooks
import { useAuthState } from '../../../context';
// Utils & data
import { editAccountInitialValues } from './initialValues';
import { editAccountValidationSchema } from './validationSchemas';
// Styles
import { useStyles } from './styles';

export const EditAccountForm = () => {
  const classes = useStyles();
  const { loading, editDetails, user } = useAuthState();

  const initialValues = user
    ? {
        phone: user.phone,
        activeRadius: user.activeRadius,
        address: user.address,
      }
    : editAccountInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => editDetails(data)}
      validationSchema={editAccountValidationSchema}
    >
      {({ errors, touched, handleReset }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="phone"
                as={TextField}
                variant="outlined"
                autoComplete="phone"
                fullWidth
                label="Nr telefonu"
                error={touched.phone && !!errors.phone}
                helperText={
                  (touched.phone && errors.phone) ||
                  'np. 123456789 (bez myślników)'
                }
              />
            </Grid>
            <AddressFieldset namespace="address" />
            <Grid item xs={12}>
              <Field
                name="activeRadius"
                type="number"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Promień działania"
                error={touched.activeRadius && !!errors.activeRadius}
                helperText={
                  (touched.activeRadius && errors.activeRadius) ||
                  'Podaj maksymalną odległość w km, jaką możesz pokonać w celu obserwacji zawodnika'
                }
                inputProps={{
                  min: 0,
                }}
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
            onClick={handleReset}
          >
            Reset
          </Button>
        </Form>
      )}
    </Formik>
  );
};
