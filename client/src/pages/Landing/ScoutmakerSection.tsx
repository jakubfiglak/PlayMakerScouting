import {
  makeStyles,
  Theme,
  Typography,
  List,
  CssBaseline,
} from '@material-ui/core';
import backgroundImg from '../../assets/scouting-background.png';
import phoneMockup from '../../assets/phone-mockup-activity.png';
import { ListElement } from './ListElement';
import { CtaButton } from './CtaButton';
import { AppNumbers } from './AppNumbers';
import { LayoutContentWrapper } from './LayoutContentWrapper';

export const ScoutmakerSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <LayoutContentWrapper>
        <CssBaseline />
        <div className={classes.innerContainer}>
          <div style={{ width: '40%' }} className={classes.imageContainer}>
            <img src={phoneMockup} alt="App dashboard view" />
          </div>
          <div className={classes.contentContainer}>
            <Typography className={classes.heading} component="h2">
              Scout<span>Maker</span>.pro
            </Typography>
            <List className={classes.list}>
              <ListElement text="Korzystaj z największej bazy skautingowej w Polsce" />
              <ListElement text="Uzyskaj dostęp do statystyk, notatek, raportów i profili piłkarzy" />
              <ListElement text="Zlecaj indywidualną obserwację zawodnika" />
            </List>
            <div className={classes.button}>
              <CtaButton text="Zobacz szczegóły" linkTo="/" />
            </div>
            <AppNumbers />
          </div>
        </div>
      </LayoutContentWrapper>
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',

    [theme.breakpoints.down('lg')]: {
      backgroundPosition: 'left center',
    },
  },
  innerContainer: {
    display: 'flex',
    color: theme.palette.primary.contrastText,
    paddingTop: 200,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 50,
    },
  },
  imageContainer: {
    width: '40%',

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,

    '& span': {
      color: theme.palette.secondary.main,
    },

    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
    },
  },
  list: {
    fontSize: 36,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    margin: '0 auto',
  },
  button: {
    alignSelf: 'flex-end',

    [theme.breakpoints.down('lg')]: {
      alignSelf: 'center',
    },
  },
}));
