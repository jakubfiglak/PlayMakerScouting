import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';

export const BasicDataStep = () => {
  const [minutesField, minutesMeta] = useField('minutesPlayed');
  const [goalsField, goalsMeta] = useField('goals');
  const [assistsField, assistsMeta] = useField('assists');
  const [yellowCardsField, yellowCardsMeta] = useField('yellowCards');
  const [redCardsField, redCardsMeta] = useField('redCards');

  const { error: minutesError, touched: minutesTouched } = minutesMeta;
  const { error: goalsError, touched: goalsTouched } = goalsMeta;
  const { error: assistsError, touched: assistsTouched } = assistsMeta;
  const {
    error: yellowCardsError,
    touched: yellowCardsTouched,
  } = yellowCardsMeta;
  const { error: redCardsError, touched: redCardsTouched } = redCardsMeta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          {...minutesField}
          variant="outlined"
          fullWidth
          id="minutesPlayed"
          label="Rozegrane minuty"
          type="number"
          inputProps={{
            min: 0,
            max: 90,
          }}
          error={minutesTouched && !!minutesError}
          helperText={minutesTouched && minutesError}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          {...goalsField}
          variant="outlined"
          fullWidth
          id="goals"
          label="Bramki"
          type="number"
          inputProps={{
            min: 0,
          }}
          error={goalsTouched && !!goalsError}
          helperText={goalsTouched && goalsError}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          {...assistsField}
          variant="outlined"
          fullWidth
          id="assists"
          label="Asysty"
          type="number"
          inputProps={{
            min: 0,
          }}
          error={assistsTouched && !!assistsError}
          helperText={assistsTouched && assistsError}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          {...yellowCardsField}
          variant="outlined"
          fullWidth
          id="yellowCards"
          label="Żółte kartki"
          type="number"
          inputProps={{
            min: 0,
            max: 2,
          }}
          error={yellowCardsTouched && !!yellowCardsError}
          helperText={yellowCardsTouched && yellowCardsError}
        />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <TextField
          {...redCardsField}
          variant="outlined"
          fullWidth
          id="redCards"
          label="Czerwone kartki"
          type="number"
          inputProps={{
            min: 0,
            max: 1,
          }}
          error={redCardsTouched && !!redCardsError}
          helperText={redCardsTouched && redCardsError}
        />
      </Grid>
    </Grid>
  );
};
