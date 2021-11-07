import { Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import { EffectCard } from './EffectCard';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { Effect } from './data';

type Props = { effects: Effect[] };

export const EffectsSection = ({ effects }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Zaufali nam
        </Typography>
        <Grid
          container
          spacing={3}
          justify="space-between"
          className={classes.container}
        >
          {effects.map((effect) => (
            <Grid item key={effect.name} xl={3} sm={6} xs={12}>
              <EffectCard
                title={effect.name}
                text={effect.text}
                logo={effect.logo}
              />
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      textAlign: 'center',
    },
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));
