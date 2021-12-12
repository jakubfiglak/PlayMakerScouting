import { Typography, makeStyles, Theme, Grid } from '@material-ui/core';
import { LayoutContentWrapper } from './LayoutContentWrapper';
import { AdvantageTile } from './AdvantageTile';
import { Advantage } from './types';

type Props = {
  advantages: Advantage[];
  dark?: boolean;
};

export const AdvantagesSection = ({ advantages, dark }: Props) => {
  const classes = useStyles({ dark });

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Korzyści
        </Typography>
      </LayoutContentWrapper>
      <LayoutContentWrapper>
        <Grid container spacing={2} className={classes.tilesContainer}>
          {advantages.map((advantage) => (
            <Grid item xs={12} md={6} lg={3} key={advantage.title}>
              <AdvantageTile advantage={advantage} />
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </section>
  );
};

type StyleProps = {
  dark?: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: (props) => ({
    background: props.dark ? '#000' : '',
    color: props.dark ? theme.palette.primary.contrastText : '',
  }),
  heading: {
    fontSize: 48,
    padding: theme.spacing(3, 0),

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
  tilesContainer: {
    padding: theme.spacing(4, 0),
  },
}));
