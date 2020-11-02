import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';

export const SummaryStep = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <RatingInput title="Podsumowanie występu" namespace="final" />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};
