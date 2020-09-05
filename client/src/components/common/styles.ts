import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)}px 0`,
    },
  },
}));
