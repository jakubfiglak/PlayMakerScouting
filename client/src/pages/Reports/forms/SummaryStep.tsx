import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { RatingSelect } from '../../../components/selects/RatingSelect';

export const SummaryStep = () => {
  const [field, meta] = useField('summary');

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <RatingSelect name="finalRating" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...field}
          id="summary"
          fullWidth
          label="Opis"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
          error={touched && !!error}
          helperText={touched && error}
        />
      </Grid>
    </Grid>
  );
};
