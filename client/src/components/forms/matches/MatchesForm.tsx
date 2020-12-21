import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { CompetitionSelect, ClubsCombo } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { MatchesFormData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
// Hooks
import { useMatchesState } from '../../../context';
// Utils & data
import { matchesFormInitialValues } from '../initialValues';
import { matchesFormValidationSchema } from '../validationSchemas';

type MatchesFormProps = {
  clubsData: ClubData[];
};

export const MatchesForm = ({ clubsData }: MatchesFormProps) => {
  const {
    loading,
    addMatch,
    current,
    clearCurrent,
    editMatch,
  } = useMatchesState();

  const initialValues: MatchesFormData = current
    ? {
        homeTeam: current.homeTeam._id,
        awayTeam: current.awayTeam._id,
        competition: current.competition,
        date: current.date.slice(0, 10),
      }
    : matchesFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={matchesFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        if (current) {
          editMatch(current._id, data);
          clearCurrent();
          resetForm();
        } else {
          addMatch(data);
          resetForm();
        }
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          {loading && <Loader />}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <ClubsCombo
                  clubsData={clubsData}
                  name="homeTeam"
                  label="Gospodarz"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <ClubsCombo
                  clubsData={clubsData}
                  name="awayTeam"
                  label="Gość"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <CompetitionSelect />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="date"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Data"
                id="date"
                error={touched.date && !!errors.date}
                helperText={touched.date && errors.date}
              />
            </Grid>
            <MainFormActions
              label="mecz"
              isEditState={!!current}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
