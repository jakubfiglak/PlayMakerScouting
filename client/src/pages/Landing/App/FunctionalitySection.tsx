import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { functionalities } from './data';

export const FunctionalitySection = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Funkcjonalności
        </Typography>
      </LayoutContentWrapper>
      <LayoutContentWrapper>
        <Grid
          container
          spacing={6}
          component="ul"
          justify="space-between"
          className={classes.tilesContainer}
        >
          {functionalities.map((functionality) => (
            <Grid
              item
              component="li"
              key={functionality.title}
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
            >
              <Typography variant="h4" className={classes.title}>
                {functionality.title}
              </Typography>
              <Typography className={classes.text}>
                {functionality.text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: theme.spacing(4),
  },
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  tilesContainer: {
    marginTop: theme.spacing(3),
  },
  text: {
    fontSize: 18,
  },
}));
