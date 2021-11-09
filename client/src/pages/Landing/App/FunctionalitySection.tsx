import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { functionalities } from './data';

export const FunctionalitySection = () => {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.headingContainer}>
        <LayoutContentWrapper>
          <Typography variant="h2" className={classes.heading}>
            Funkcjonalności
          </Typography>
        </LayoutContentWrapper>
      </div>
      <LayoutContentWrapper>
        <Grid
          container
          spacing={3}
          component="ul"
          justify="space-between"
          className={classes.container}
        >
          {functionalities.map((functionality) => (
            <Grid
              item
              component="li"
              key={functionality.title}
              xl={4}
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
  headingContainer: {
    background: '#000',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
    clipPath: `polygon(
      0 0,
      100% 0,
      100% calc(100% - 30px),
      0 100%
    )`,
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
  container: {
    marginTop: theme.spacing(3),
  },
  text: {
    fontSize: 18,
  },
}));
