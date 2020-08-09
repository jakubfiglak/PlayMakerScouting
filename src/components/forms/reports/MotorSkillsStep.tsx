import React from 'react';
// MUI components
import { Grid, TextFieldProps, TextField } from '@material-ui/core';
// Types
import { MotorSkillsFormData } from '../../../types/reports';

type MotorSkillsStepProps = MotorSkillsFormData & TextFieldProps;

export const MotorSkillsStep = ({
  leading,
  neglected,
  onChange,
}: MotorSkillsStepProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id="leading"
          name="leading"
          value={leading}
          onChange={onChange}
          fullWidth
          label="Cechy wiodące"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="neglected"
          name="neglected"
          value={neglected}
          onChange={onChange}
          fullWidth
          label="Cechy zaniedbane"
          multiline
          rowsMax={4}
          variant="outlined"
          inputProps={{
            maxlength: 400,
          }}
        />
      </Grid>
    </Grid>
  );
};
