import { Link } from 'react-router-dom';
import {
  Typography,
  CssBaseline,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import backgroundImg from '../../assets/scouting-background.png';
import { Header } from './Header';
import { CtaButton } from './CtaButton';

export const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <Header />
      <main>
        <section>
          <div className={classes.innerWrapper}>
            <Typography variant="h1" className={classes.heading}>
              Wprowadź skauting na wyższy poziom!
            </Typography>
            <div>
              <Typography variant="h2" align="center">
                Wybierz jeden z 4 produktów skautingowych
              </Typography>
              <div className={classes.buttonsContainer}>
                <CtaButton text="Skauting klubowy" linkTo="/" />
                <CtaButton text="Skauting akademia" linkTo="/" />
                <CtaButton text="Aplikacja skautingowa" linkTo="/" />
                <CtaButton text="Analiza danych" linkTo="/" />
              </div>
            </div>
          </div>
          <div className={classes.goToApp}>
            <Link to="/login" className={classes.link}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.goToAppButton}
              >
                Przejdź do aplikacji
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    color: theme.palette.primary.contrastText,
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',

    [theme.breakpoints.down('lg')]: {
      backgroundPosition: 'left center',
    },
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 64,

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 48,
    },
  },
  innerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(6),
    paddingTop: 300,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      paddingTop: 200,
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      paddingTop: 120,
    },
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  goToApp: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(6),
  },
  link: {
    textDecoration: 'none',
  },
  goToAppButton: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold,
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 6),

    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
}));
