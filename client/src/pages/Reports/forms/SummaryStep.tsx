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
          placeholder="Wprowadź notatki podczas meczu, a po meczu przejdź do następnego kroku i przenieś notatki do odpowiednich sekcji, by dokończyć tworzenie raportu"
          inputProps={{
            maxLength: 400,
          }}
          error={touched && !!error}
          helperText={touched && error}
        />
      </Grid>
    </Grid>
  );
};
