import { Typography, Button, makeStyles, Theme } from '@material-ui/core';
import { Repeat as RepeatIcon } from '@material-ui/icons';
import { Transfer } from './data';

type Props = {
  transfer: Transfer;
};

export const TransferCard = ({ transfer }: Props) => {
  const classes = useStyles();

  const { player, from, to } = transfer;

  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <img src={player.image} alt={player.name} className={classes.image} />
      </div>
      <div className={classes.contentContainer}>
        <Typography variant="h4" gutterBottom className={classes.name}>
          {player.name}
        </Typography>
        <div className={classes.transfer}>
          <div>
            <div className={classes.club}>
              <Typography>{from.name}</Typography>
              <img src={from.logo} alt={from.name} className={classes.logo} />
            </div>
            <div className={classes.club}>
              <Typography>{to.name}</Typography>
              <img src={to.logo} alt={to.name} className={classes.logo} />
            </div>
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
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderRadius: 20,
    overflow: 'hidden',
    margin: '0 auto',
  },
  imageContainer: {
    height: 300,
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    objectFit: 'contain',
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
  logo: {
    height: 30,
    marginLeft: theme.spacing(2),
  },
  club: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: 'auto',
  },
}));
