import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';

export const MotorSkillsStep = () => {
  const [leadingField, leadingMeta] = useField('motorSkills.leading');
  const [neglectedField, neglectedMeta] = useField('motorSkills.neglected');

  const { error: leadingError, touched: leadingTouched } = leadingMeta;
  const { error: neglectedError, touched: neglectedTouched } = neglectedMeta;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          {...leadingField}
          id="leading"
          fullWidth
          label="Cechy wiodące"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
          error={leadingTouched && !!leadingError}
          helperText={leadingTouched && leadingError}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...neglectedField}
          id="neglected"
          fullWidth
          label="Cechy zaniedbane"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
          error={neglectedTouched && !!neglectedError}
          helperText={neglectedTouched && neglectedError}
        />
      </Grid>
    </Grid>
  );
};
