import React from 'react';
// MUI components
import { Grid, Typography } from '@material-ui/core';

type RatingProps = {
  label: string;
  rating: 1 | 2 | 3 | 4;
  note: string;
};

export const Rating = ({ label, rating, note }: RatingProps) => {
  return (
    <Grid item xs={12}>
      <Typography>
        <strong>{label}: </strong>
        {rating}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {note}
      </Typography>
    </Grid>
  );
};
