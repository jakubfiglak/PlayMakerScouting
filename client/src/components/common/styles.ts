import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  alertsContainer: {
    position: 'fixed',
    top: theme.spacing(2),
    left: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5000,
  },

  box: {
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)}px 0`,
    },
  },
}));
