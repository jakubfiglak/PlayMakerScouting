import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { FormContainer } from '../../components/FormContainer';
// Types
import { EditAccountData, User } from '../../types/auth';
import { Voivodeship } from '../../types/common';

type Props = {
  user: User;
  onSubmit: (data: EditAccountData) => void;
};

export const EditAccountForm = ({ user, onSubmit }: Props) => {
  const classes = useStyles();

  const initialValues: EditAccountData = {
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city || null,
    voivodeship: user.voivodeship || null,
    phone: user.phone || null,
    activeRadius: user.activeRadius || 0,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => onSubmit(data)}
      validationSchema={validationSchema}
    >
      {({ errors, touched, handleReset }) => (
        <Form className={classes.container}>
          <FormContainer>
            <Field
              name="firstName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Imię"
              error={touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              name="lastName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwisko"
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            <Field
              name="city"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Miasto"
              error={touched.city && !!errors.city}
              helperText={touched.city && errors.city}
            />
            <VoivodeshipSelect name="voivodeship" />
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
            <div className={classes.buttonsContainer}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Zapisz zmiany
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    gap: `${theme.spacing(2)}px`,
  },
}));

const validationSchema: yup.ObjectSchema<EditAccountData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    city: yup.string().defined().nullable(),
    voivodeship: yup.mixed<Voivodeship | 'Zagranica'>().nullable(),
    phone: yup.string().defined().nullable(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 '),
  })
  .defined();
