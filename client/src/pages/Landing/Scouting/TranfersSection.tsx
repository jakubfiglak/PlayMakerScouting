import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
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
        <Grid container spacing={3}>
          {transfers.map((transfer) => (
            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={12}
              key={transfer.player.name}
            >
              <TransferCard transfer={transfer} />
            </Grid>
          ))}
        </Grid>
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
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  wrapper: {
    background: '#000',
  },
}));
