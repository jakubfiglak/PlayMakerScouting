import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { PositionSelect, FootSelect, ClubsCombo } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { PlayersFormData } from '../../../types/players';
import { ClubData } from '../../../types/simplifiedData';
// Hooks
import { usePlayersState } from '../../../context';

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

  return (
    <Formik
      initialValues={
        {
          firstName: current?.firstName || '',
          lastName: current?.lastName || '',
          club: current?.club || '',
          position: current?.position || 'CM',
          dateOfBirth:
            current && current.dateOfBirth
              ? current.dateOfBirth.slice(0, 10)
              : '2000-01-01',
          height: current?.height || 0,
          weight: current?.weight || 0,
          footed: current?.footed || 'R',
        } as PlayersFormData
      }
      onSubmit={(data) => {
        if (current) {
          editPlayer(data);
          clearCurrent();
        } else {
          addPlayer(data);
        }
      }}
    >
      {({ handleReset }) => (
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
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth>
                <FootSelect />
              </FormControl>
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
