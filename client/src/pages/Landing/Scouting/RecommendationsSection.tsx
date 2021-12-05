import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { recommendations } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationsSection = () => {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.container}>
        <LayoutContentWrapper>
          <Typography variant="h2" className={classes.heading}>
            Pozostałe polecenia
          </Typography>
          <Grid container spacing={3} className={classes.cardsContainer}>
            {recommendations.map((recommendation) => (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                key={recommendation.player}
              >
                <RecommendationCard recommendation={recommendation} />
              </Grid>
            ))}
          </Grid>
        </LayoutContentWrapper>
      </div>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#000',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
  },
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  subtitle: {
    fontSize: 36,
    marginBottom: theme.spacing(3),

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  wrapper: {
    background: '#000',
  },
  cardsContainer: {
    marginTop: theme.spacing(2),
  },
}));
