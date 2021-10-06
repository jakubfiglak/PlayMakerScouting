import { makeStyles, Theme, Typography } from '@material-ui/core';
import logoWhite from '../assets/logo-white.png';

export const PlaymakerLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logoWhite} alt="PlaymakerPro Logo" />
      <Typography variant="h5" noWrap component="h1">
        ScoutMaker Pro
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1, 1, 1, 0),
    width: '60px',
  },
}));
