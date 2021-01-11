import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { CompetitionSelect } from '../../../components/selects/CompetitionSelect';
import { MatchLocationSelect } from '../../../components/selects/MatchLocationSelect';

export const MatchStep = () => {
  const [field, meta] = useField('match.against');

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CompetitionSelect name="match.competition" />
      </Grid>
      <Grid item xs={6}>
        <MatchLocationSelect name="match.location" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...field}
          id="against"
          fullWidth
          label="Przeciwnik"
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      </Grid>
    </Grid>
  );
};
