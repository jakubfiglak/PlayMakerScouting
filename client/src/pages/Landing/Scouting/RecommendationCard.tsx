import { Typography, Button, Link, makeStyles, Theme } from '@material-ui/core';
import { Repeat as RepeatIcon } from '@material-ui/icons';
import { Recommendation } from './data';

type Props = {
  recommendation: Recommendation;
};

export const RecommendationCard = ({ recommendation }: Props) => {
  const classes = useStyles();

  const { player, from, to, reportLink } = recommendation;

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
      <Link
        href={reportLink}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Zobacz raport
        </Button>
      </Link>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.primary.contrastText,
    margin: '0 auto',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.contrastText}`,
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
  link: {
    marginTop: 'auto',
    alignSelf: 'flex-end',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    width: '100%',
  },
}));
