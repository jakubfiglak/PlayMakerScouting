import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { recommendations } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationsSection = () => {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.headingContainer}>
        <LayoutContentWrapper>
          <Typography variant="h2" className={classes.heading}>
            Pozostałe polecenia
          </Typography>
        </LayoutContentWrapper>
      </div>
      <LayoutContentWrapper>
        <Grid container spacing={3}>
          {recommendations.map((recommendation) => (
            <Grid item xl={4} md={6} sm={6} xs={12} key={recommendation.player}>
              <RecommendationCard recommendation={recommendation} />
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
}));
