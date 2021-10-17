import { useField } from 'formik';
// MUI components
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Custom components
import { StyledRating } from '../../../components/StyledRating';

type Props = {
  title: string;
  index: number;
  maxRatingScore: number;
  hasScore: boolean;
  placeholder?: string;
};

export const RatingInput = ({
  title,
  index,
  placeholder,
  maxRatingScore,
  hasScore,
}: Props) => {
  const classes = useStyles();

  const [field, meta] = useField(`skills[${index}].description`);
  const [ratingField] = useField(`skills[${index}].score`);

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      {hasScore && (
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography className={classes.title}>{title}</Typography>
            <StyledRating
              {...ratingField}
              max={maxRatingScore}
              icon={<BallIcon />}
            />
          </div>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          {...field}
          fullWidth
          placeholder={placeholder}
          label={title}
          multiline
          rowsMax={4}
          variant="outlined"
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
