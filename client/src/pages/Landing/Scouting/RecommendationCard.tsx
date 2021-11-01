import { Typography, Button, makeStyles, Theme } from '@material-ui/core';
import { Repeat as RepeatIcon } from '@material-ui/icons';
import { Recommendation } from './data';

type Props = {
  recommendation: Recommendation;
};

export const RecommendationCard = ({ recommendation }: Props) => {
  const classes = useStyles();

  const { player, from, to } = recommendation;

  return (
    <div className={classes.card}>
      <div className={classes.contentContainer}>
        <Typography variant="h4" gutterBottom className={classes.name}>
          {player}
        </Typography>
        <div className={classes.transfer}>
          <div>
            <Typography>{from}</Typography>
            <Typography>{to}</Typography>
          </div>
          <RepeatIcon />
        </div>
      </div>
      <Button color="secondary" variant="contained" className={classes.button}>
        Zobacz raport
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.primary.main,
    margin: '0 auto',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
  },
  contentContainer: {
    padding: theme.spacing(1, 3),
  },
  name: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
  },
  transfer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
}));
