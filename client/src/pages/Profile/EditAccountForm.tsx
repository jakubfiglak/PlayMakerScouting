import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { Grid, TextField, Button } from '@material-ui/core';
// Custom components
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
// Types
import { EditAccountData, User } from '../../types/auth';
import { Voivodeship } from '../../types/common';

type Props = {
  user: User;
  onSubmit: (data: EditAccountData) => void;
};

export const EditAccountForm = ({ user, onSubmit }: Props) => {
  const initialValues: EditAccountData = {
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city || '',
    voivodeship: user.voivodeship || '',
    phone: user.phone || '',
    activeRadius: user.activeRadius || 0,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => onSubmit(data)}
      validationSchema={validationSchema}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Zapisz zmiany
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema: yup.ObjectSchema<EditAccountData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    city: yup.string(),
    voivodeship: yup.mixed<Voivodeship | 'Zagranica'>(),
    phone: yup.string(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 '),
  })
  .defined();
