import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { PositionSelect, FootSelect, ClubsCombo } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { ClubData } from '../../../types/simplifiedData';
import { PlayersFormData } from '../../../types/players';
// Hooks
import { usePlayersState } from '../../../context';
// Utils & data
import { validationSchema } from './validationSchema';

type Props = {
  clubsData: ClubData[];
};

export const PlayersForm = ({ clubsData }: Props) => {
  const {
    loading,
    addPlayer,
    current,
    clearCurrent,
    editPlayer,
  } = usePlayersState();

  const initialValues: PlayersFormData = {
    firstName: current?.firstName || '',
    lastName: current?.lastName || '',
    club: current?.club._id || '',
    position: current?.position || 'CM',
    dateOfBirth:
      current && current.dateOfBirth
        ? current.dateOfBirth.slice(0, 10)
        : '2000-01-01',
    height: current?.height || 0,
    weight: current?.weight || 0,
    footed: current?.footed || 'R',
    lnpID: current?.lnpID || '',
    lnpProfileURL: current?.lnpProfileURL || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        if (current) {
          editPlayer(current._id, data);
          clearCurrent();
        } else {
          addPlayer(data);
        }
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          {loading && <Loader />}
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
                name="dateOfBirth"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Data urodzenia"
                error={touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name="height"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Wzrost [cm]"
                type="number"
                inputProps={{
                  min: 0,
                }}
                error={touched.height && !!errors.height}
                helperText={touched.height && errors.height}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name="weight"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Waga [kg]"
                type="number"
                inputProps={{
                  min: 0,
                }}
                error={touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth>
                <FootSelect />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lnpID"
                as={TextField}
                variant="outlined"
                fullWidth
                label="ID Łączy Nas Piłka"
                error={touched.lnpID && !!errors.lnpID}
                helperText={
                  (touched.lnpID && errors.lnpID) || 'Pole opcjonalne'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lnpProfileURL"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Link do profilu ŁNP"
                error={touched.lnpProfileURL && !!errors.lnpProfileURL}
                helperText={
                  (touched.lnpProfileURL && errors.lnpProfileURL) ||
                  'Pole opcjonalne'
                }
              />
            </Grid>
            <MainFormActions
              label="zawodnika"
              current={!!current}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
