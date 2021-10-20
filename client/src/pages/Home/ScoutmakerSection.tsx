import { makeStyles, Theme, Typography, List } from '@material-ui/core';
import backgroundImg from '../../assets/scouting-background.png';
import phoneMockup from '../../assets/phone-mockup-activity.png';
import { ListElement } from './ListElement';
import { CtaButton } from './CtaButton';
import { AppNumbers } from './AppNumbers';

export const ScoutmakerSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div style={{ width: '40%' }}>
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
    </section>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    display: 'flex',
    padding: '48px 16px 24px',
  },
  heading: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightBold,

    '& span': {
      color: theme.palette.secondary.main,
    },
  },
  list: {
    fontSize: 36,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
  },
  button: {
    width: 300,
    alignSelf: 'flex-end',
    background: 'black',
  },
}));
