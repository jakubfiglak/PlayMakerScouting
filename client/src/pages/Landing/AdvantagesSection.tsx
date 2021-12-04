import { Typography, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from './LayoutContentWrapper';
import { AdvantageTile } from './AdvantageTile';
import { Advantage } from './types';

type Props = {
  subtitle?: boolean;
  advantages: Advantage[];
};

export const AdvantagesSection = ({ subtitle, advantages }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Korzyści
        </Typography>
        {subtitle ? (
          <Typography className={classes.subtitle}>
            korzystania z Scout<em>Maker</em>.pro
          </Typography>
        ) : null}
      </LayoutContentWrapper>
      <LayoutContentWrapper>
        <div className={classes.tilesContainer}>
          {advantages.map((advantage) => (
            <AdvantageTile advantage={advantage} key={advantage.title} />
          ))}
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
