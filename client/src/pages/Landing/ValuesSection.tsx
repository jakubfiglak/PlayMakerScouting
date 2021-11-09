import { Typography, makeStyles, Theme } from '@material-ui/core';
import { ValueTile } from './ValueTile';
import { LayoutContentWrapper } from './LayoutContentWrapper';
import { Value } from './types';

type Props = { values: Value[] };

export const ValuesSection = ({ values }: Props) => {
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
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  tilesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
