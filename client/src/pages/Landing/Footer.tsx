import { Link, Divider, makeStyles, Theme } from '@material-ui/core';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  LocalPhone as PhoneIcon,
  Mail as MailIcon,
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { LayoutContentWrapper } from './LayoutContentWrapper';
import logoWhite from '../../assets/logo-white.png';

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <LayoutContentWrapper>
        <div className={classes.innerWrapper}>
          <div className={classes.iconsWrapper}>
            <img
              src={logoWhite}
              alt="Scoutmaker logo"
              className={classes.playmakerLogo}
            />
            <div className={classes.socialIconsContainer}>
              <Link
                href="https://www.facebook.com/playmakerpropl/"
                className={classes.socialLink}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/playmaker.pro/"
                className={classes.socialLink}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://twitter.com/ProPlaymaker"
                className={classes.socialLink}
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://pl.linkedin.com/company/playmaker-pro"
                className={classes.socialLink}
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
          <div className={classes.linksContainer}>
            <Link component={RouterLink} to="club-scouting">
              Skauting Klubowy
            </Link>
            <Link component={RouterLink} to="scouting-app">
              Aplikacja Skautingowa
            </Link>
            <Link component={RouterLink} to="data-analysis">
              Analiza Danych
            </Link>
            <Link component={RouterLink} to="scouting-academy">
              Skauting Akademia
            </Link>
          </div>
          <Divider orientation="vertical" className={classes.divider} />
          <div className={classes.contactContainer}>
            <Link href="tel:+48504271466" className={classes.contact}>
              <PhoneIcon />
              +48 504 271 466
            </Link>
            <Link href="mailto:biuro@playmaker.pro" className={classes.contact}>
              <MailIcon />
              biuro@playmaker.pro
            </Link>
          </div>
        </div>
      </LayoutContentWrapper>
    </footer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#000',
    marginTop: theme.spacing(3),
  },
  innerWrapper: {
    width: '100%',
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2, 0),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  iconsWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
  },
  playmakerLogo: {
    height: 100,
  },
  socialIconsContainer: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      gap: theme.spacing(2),
    },
  },
  socialLink: {
    color: theme.palette.primary.contrastText,
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: theme.spacing(3),
    fontSize: 18,
    flex: 1,

    '& a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  divider: {
    background: theme.palette.primary.contrastText,
    width: 4,
    height: 60,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  contactContainer: {
    fontSize: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  contact: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));
