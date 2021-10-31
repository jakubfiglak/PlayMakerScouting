import { Typography, makeStyles, Theme } from '@material-ui/core';
import { transfers } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { TransferCard } from './TransferCard';

export const TransfersSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Efekty działań
        </Typography>
        <Typography className={classes.subtitle}>
          Scout<em>Maker</em>.pro
        </Typography>
        <div className={classes.cardContainer}>
          {transfers.map((transfer) => (
            <TransferCard transfer={transfer} key={transfer.player.name} />
          ))}
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#000',
    color: theme.palette.primary.contrastText,
  },
  heading: {
    fontSize: 48,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  subtitle: {
    fontSize: 36,

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  wrapper: {
    background: '#000',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(4),
    marginTop: theme.spacing(3),
  },
}));
