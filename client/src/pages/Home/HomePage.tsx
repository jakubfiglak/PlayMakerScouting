import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { PlaymakerLogo } from '../../components/PlaymakerLogo';
import { useAuthState } from '../../context/auth/useAuthState';
import soccerField from '../../assets/soccer_field.jpg';

export const HomePage = () => {
  const classes = useStyles();

  const { user } = useAuthState();

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <PlaymakerLogo />
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.innerWrapper}>
          <Typography
            variant="h2"
            color="inherit"
            className={classes.mainHeading}
          >
            Skauting Playmaker.Pro
          </Typography>
          <Typography variant="h3" color="inherit">
            Szukaj talentów, twórz raporty, podejmij współpracę z Playmaker.Pro
          </Typography>
          <Link to={user ? '/dashboard' : '/login'} className={classes.link}>
            <Button variant="contained" color="secondary" size="large">
              Start
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    backgroundImage: `url(${soccerField})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative',
    flexGrow: 1,

    '&::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(51,61,74,0.6)',
    },
  },
  innerWrapper: {
    position: 'relative',
    zIndex: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.background.paper,
    padding: theme.spacing(8, 1),
  },
  mainHeading: {
    textTransform: 'uppercase',
    margin: theme.spacing(5, 0),
  },
  link: {
    color: theme.palette.background.paper,
    textDecoration: 'none',
    margin: theme.spacing(5, 0),
  },
}));
