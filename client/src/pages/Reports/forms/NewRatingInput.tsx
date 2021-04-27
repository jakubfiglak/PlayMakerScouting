import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';

type Props = {
  title: string;
  namespace: string;
  maxRatingScore: number;
  hasScore: boolean;
  placeholder?: string;
};

export const NewRatingInput = ({
  title,
  namespace,
  placeholder,
  maxRatingScore,
  hasScore,
}: Props) => {
  const classes = useStyles();

  const [field, meta] = useField(`${namespace}.note`);
  const [ratingField] = useField(`${namespace}.rating`);

  const { error, touched } = meta;

  return (
    <Grid container spacing={2}>
      {hasScore && (
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography className={classes.title}>{title}</Typography>
            <Rating
              {...ratingField}
              name={`${namespace}.rating`}
              max={maxRatingScore}
              icon={<BallIcon />}
            />
          </div>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          {...field}
          id={`${namespace}.note`}
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
