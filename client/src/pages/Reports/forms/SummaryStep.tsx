import { useField } from 'formik';
// MUI components
import {
  Grid,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';

export const SummaryStep = () => {
  const classes = useStyles();

  const [field, meta] = useField('summary');
  const [ratingField] = useField('finalRating');

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={classes.container}>
          <Typography className={classes.title}>Ocena ostateczna</Typography>
          <Rating
            {...ratingField}
            name="finalRating"
            max={4}
            icon={<BallIcon />}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...field}
          id="summary"
          fullWidth
          label="Opis"
          multiline
          variant="outlined"
          placeholder="Wprowadź notatki podczas meczu, a po meczu przejdź do następnego kroku i przenieś notatki do odpowiednich sekcji, by dokończyć tworzenie raportu"
          error={touched && !!error}
          helperText={touched && error}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
  title: {
    fontWeight: 'bold',
  },
}));
