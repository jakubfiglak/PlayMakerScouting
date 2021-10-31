import { Typography, makeStyles, Theme } from '@material-ui/core';
import { ValueTile } from './ValueTile';
import { values } from './data';
import { LayoutContentWrapper } from '../LayoutContentWrapper';

export const HowDoWeWorkSection = () => {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.shape} />
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Jak działamy?
        </Typography>
        <div className={classes.tilesContainer}>
          {values.map((value) => (
            <ValueTile value={value} key={value.number} />
          ))}
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  shape: {
    width: '100%',
    height: 50,
    background: '#000',
    clipPath: `polygon(
      0 0,
      100% 0,
      100% calc(100% - 20px),
      0 100%
    )`,
  },
  heading: {
    fontSize: 48,
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  tilesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
