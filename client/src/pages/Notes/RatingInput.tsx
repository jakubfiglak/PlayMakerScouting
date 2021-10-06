import { useField } from 'formik';
// MUI components
import { Typography, makeStyles, Theme } from '@material-ui/core';
// MUI icons
import { SportsSoccer as BallIcon } from '@material-ui/icons';
// Custom components
import { StyledRating } from '../../components/StyledRating';

type Props = { max: number };

export const RatingInput = ({ max }: Props) => {
  const classes = useStyles();
  const [ratingField] = useField('rating');

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>Ocena</Typography>
      <StyledRating
        {...ratingField}
        name="rating"
        max={max}
        icon={<BallIcon />}
      />
    </div>
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
