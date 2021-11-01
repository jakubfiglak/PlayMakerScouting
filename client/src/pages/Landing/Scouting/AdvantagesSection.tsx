import { Typography, makeStyles, Theme } from '@material-ui/core';
import { advantages } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { AdvantageTile } from './AdvantageTile';

export const AdvantagesSection = () => {
  const classes = useStyles();

  return (
    <section>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Zalety
        </Typography>
        <Typography className={classes.subtitle}>
          korzystania z Scout<em>Maker</em>.pro
        </Typography>
      </LayoutContentWrapper>
      <div className={classes.shape} />
      <div className={classes.wrapper}>
        <LayoutContentWrapper>
          <div className={classes.tilesContainer}>
            {advantages.map((advantage) => (
              <AdvantageTile advantage={advantage} key={advantage.title} />
            ))}
          </div>
        </LayoutContentWrapper>
      </div>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  shape: {
    width: '100%',
    height: 30,
    background: '#000',
    clipPath: `polygon(
      0 calc(100% - 15px),
      100% 0,
      100% 100%,
      0 100%
    )`,
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

    '& em': {
      color: theme.palette.secondary.main,
      fontStyle: 'normal',
    },
  },
  wrapper: {
    background: '#000',
  },
  tilesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
