import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  input: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  bottomNav: {
    width: '500px',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(calc(-50% + 120px))',
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1000,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));
