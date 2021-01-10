import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { FormModal } from '../FormModal';
import { PositionSelect } from '../selects/PositionSelect';
import { FootSelect } from '../selects/FootSelect';
import { ClubsCombo } from '../selects/ClubsCombo';
// Types
import { ClubBasicInfo } from '../../types/clubs';
import { PlayersFormData } from '../../types/players';
// Utils & data
import { playersFormValidationSchema } from '../../data/forms/validationSchemas';
import { playersFormInitialValues } from '../../data/forms/initialValues';

type Props = {
  clubsData: ClubBasicInfo[];
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PlayersFormData) => void;
};

export const AddPlayerModal = ({
  clubsData,
  open,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Formik
      initialValues={playersFormInitialValues}
      validationSchema={playersFormValidationSchema}
      enableReinitialize
      onSubmit={(data) => {
        onSubmit(data);
        onClose();
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <FormModal
          title="Dodaj zawodnika"
          onClose={onClose}
          onSubmit={handleSubmit}
          open={open}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstName"
                  as={TextField}
                  variant="outlined"
                  autoComplete="fname"
                  fullWidth
                  label="Imię"
                  autoFocus
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  as={TextField}
                  variant="outlined"
                  autoComplete="lname"
                  fullWidth
                  label="Nazwisko"
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <ClubsCombo clubsData={clubsData} name="club" label="Klub" />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <PositionSelect />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="yearOfBirth"
                  as={TextField}
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="Rok urodzenia"
                  error={touched.yearOfBirth && !!errors.yearOfBirth}
                  helperText={touched.yearOfBirth && errors.yearOfBirth}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                  <FootSelect />
                </FormControl>
              </Grid>
            </Grid>
          </Form>
        </FormModal>
      )}
    </Formik>
  );
};
