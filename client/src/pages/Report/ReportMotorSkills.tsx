import React from 'react';
// MUI components
import { Typography, Grid } from '@material-ui/core';
// Types
import { MotorSkills } from '../../types/reports';

type Props = {
  skills: MotorSkills;
};

export const ReportMotorSkills = ({ skills }: Props) => {
  const { leading, neglected } = skills;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <strong>Cechy wiodące: </strong>
          {leading}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Cechy zaniedbane: </strong>
          {neglected}
        </Typography>
      </Grid>
    </Grid>
  );
};
