import { makeStyles, Theme } from '@material-ui/core';
import logo from '../../assets/logo-white.png';

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <img src={logo} alt="Scoutmaker logo" className={classes.logo} />
    </header>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(3),
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  logo: {
    width: 160,

    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
  },
}));
