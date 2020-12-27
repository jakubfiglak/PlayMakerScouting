import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
// Custom components
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';
// Types
import { EditAccountData } from '../../types/auth';
// Utils & data
import { editAccountInitialValues } from '../../components/forms/initialValues';
import { editAccountValidationSchema } from '../../components/forms/validationSchemas';
// Styles
import { useStyles } from './styles';

export const EditAccountForm = () => {
  const classes = useStyles();
  const { loading, editDetails, user } = useAuthState();

  const initialValues: EditAccountData = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city || '',
        voivodeship: user.voivodeship || '',
        phone: user.phone || '',
        activeRadius: user.activeRadius || 0,
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
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Imię"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwisko"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="city"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Miasto"
                error={touched.city && !!errors.city}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <VoivodeshipSelect name="voivodeship" />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="phone"
                as={TextField}
                type="tel"
                variant="outlined"
                fullWidth
                label="Nr telefonu"
                error={touched.phone && !!errors.phone}
                helperText={
                  (touched.phone && errors.phone) ||
                  'np. 123456789 (bez myślników)'
                }
              />
            </Grid>
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
