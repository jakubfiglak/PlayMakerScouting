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
import { LayoutContentWrapper } from './LayoutContentWrapper';

export const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <LayoutContentWrapper>
        <CssBaseline />
        <Header />
        <main>
          <section>
            <div className={classes.innerWrapper}>
              <div className={classes.flexWrapper}>
                <div>
                  <Typography variant="h1" className={classes.heading}>
                    Wprowadź skauting na wyższy poziom!
                  </Typography>
                </div>
                <div>
                  <Typography variant="h2" align="center">
                    Wybierz jeden z 4 produktów skautingowych
                  </Typography>
                  <div className={classes.buttonsContainer}>
                    <CtaButton
                      text="Skauting klubowy"
                      linkTo="/club-scouting"
                    />
                    <CtaButton
                      text="Skauting akademia"
                      linkTo="/scouting-academy"
                    />
                    <CtaButton
                      text="Aplikacja skautingowa"
                      linkTo="/scouting-app"
                    />
                    <CtaButton text="Analiza danych" linkTo="/data-analysis" />
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
            </div>
          </section>
        </main>
      </LayoutContentWrapper>
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
    paddingRight: theme.spacing(4),

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
      paddingRight: 0,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 48,
    },
  },
  innerWrapper: {
    minHeight: 'calc(100vh - 174px)',
    paddingTop: 200,

    [theme.breakpoints.down('md')]: {
      paddingTop: 200,
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      paddingTop: 150,
    },

    [theme.breakpoints.down('xs')]: {
      paddingTop: 120,
    },
  },
  flexWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
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

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6, 0),
      justifyContent: 'stretch',
    },
  },
  link: {
    textDecoration: 'none',

    [theme.breakpoints.down('xs')]: {
      flex: 1,
    },
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

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
