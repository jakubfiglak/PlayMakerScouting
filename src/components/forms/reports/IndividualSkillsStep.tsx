import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';

export const IndividualSkillsStep = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <RatingInput />
      </Grid>
      <Grid item xs={12}>
        <RatingInput />
      </Grid>
      <Grid item xs={12}>
        <RatingInput />
      </Grid>
    </Grid>
  );
};
