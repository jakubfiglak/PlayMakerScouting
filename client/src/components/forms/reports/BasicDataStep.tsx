import React from 'react';
// MUI components
import { Grid, TextField, TextFieldProps } from '@material-ui/core';

type BasicDataStepProps = {
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
} & TextFieldProps;

export const BasicDataStep = ({
  minutesPlayed,
  goals,
  assists,
  yellowCards,
  redCards,
  onChange,
}: BasicDataStepProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          variant="outlined"
          fullWidth
          id="minutesPlayed"
          label="Rozegrane minuty"
          name="minutesPlayed"
          type="number"
          inputProps={{
            min: 0,
            max: 90,
          }}
          value={minutesPlayed}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          variant="outlined"
          fullWidth
          id="goals"
          label="Bramki"
          name="goals"
          type="number"
          inputProps={{
            min: 0,
          }}
          value={goals}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          variant="outlined"
          fullWidth
          id="assists"
          label="Asysty"
          name="assists"
          type="number"
          inputProps={{
            min: 0,
          }}
          value={assists}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          variant="outlined"
          fullWidth
          id="yellowCards"
          label="Żółte kartki"
          name="yellowCards"
          type="number"
          inputProps={{
            min: 0,
            max: 2,
          }}
          value={yellowCards}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          variant="outlined"
          fullWidth
          id="redCards"
          label="Czerwone kartki"
          name="redCards"
          type="number"
          inputProps={{
            min: 0,
            max: 1,
          }}
          value={redCards}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};
