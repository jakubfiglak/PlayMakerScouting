import { makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '../../theme/colors';

export const useStyles = makeStyles((theme: Theme) => ({
  delete: {
    color: theme.palette.error.light,
  },
  accept: {
    color: theme.palette.success.light,
  },
  negative: {
    background: theme.palette.error.main,
  },
  unknown: {
    background: theme.palette.primary.main,
  },
  observe: {
    background: theme.palette.secondary.main,
  },
  positive: {
    background: green,
  },
}));
