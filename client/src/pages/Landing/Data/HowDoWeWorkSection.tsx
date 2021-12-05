import { Typography, makeStyles, Theme } from '@material-ui/core';
import { LayoutContentWrapper } from '../LayoutContentWrapper';
import { methodology } from './data';
import { ListItem } from './ListItem';

export const HowDoWeWorkSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <Typography variant="h2" className={classes.heading}>
          Jak działamy?
        </Typography>
        <li className={classes.contentContainer}>
          {methodology.map((item) => (
            <ListItem key={item.number} number={item.number} text={item.text} />
          ))}
        </li>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#000',
    paddingBottom: theme.spacing(4),
  },
  heading: {
    fontSize: 48,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3, 0),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  contentContainer: {
    listStyle: 'none',
  },
}));
