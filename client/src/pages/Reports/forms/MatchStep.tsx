import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { CompetitionSelect } from '../../../components/selects/CompetitionSelect';
import { MatchLocationSelect } from '../../../components/selects/MatchLocationSelect';
import { PositionSelect } from '../../../components/selects/PositionSelect';

export const MatchStep = () => {
  const [againstField, againstMeta] = useField('match.against');
  const [dateField, dateMeta] = useField('match.date');
  const [shirtNoField, shirtNoMeta] = useField('shirtNo');

  const { error: againstError, touched: againstTouched } = againstMeta;
  const { error: dateError, touched: dateTouched } = dateMeta;
  const { error: shirtNoError, touched: shirtNoTouched } = shirtNoMeta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CompetitionSelect name="match.competition" />
      </Grid>
      <Grid item xs={6}>
        <MatchLocationSelect name="match.location" />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...againstField}
          id="against"
          fullWidth
          label="Przeciwnik"
          variant="outlined"
          error={againstTouched && !!againstError}
          helperText={againstTouched && againstError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...dateField}
          type="datetime-local"
          id="date"
          fullWidth
          label="Data"
          variant="outlined"
          error={dateTouched && !!dateError}
          helperText={dateTouched && dateError}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth>
          <PositionSelect
            name="positionPlayed"
            helperText="Podaj pozycję, na której zawodnik zagrał w danym meczu"
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...shirtNoField}
          type="number"
          id="shirtNo"
          fullWidth
          label="Numer na koszulce"
          variant="outlined"
          error={shirtNoTouched && !!shirtNoError}
          helperText={shirtNoTouched && shirtNoError}
          InputProps={{ inputProps: { min: 1, max: 99 } }}
        />
      </Grid>
    </Grid>
  );
};
