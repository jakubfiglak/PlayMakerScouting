import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  delete: {
    color: theme.palette.error.light,
  },
  accept: {
    color: theme.palette.success.light,
  },
  chip: {
    fontWeight: theme.typography.fontWeightBold,
  },
  avatarOpen: {
    background: theme.palette.success.main,
  },
  open: {
    background: theme.palette.success.light,
  },
  avatarAccepted: {
    background: theme.palette.secondary.main,
  },
  accepted: {
    background: theme.palette.secondary.light,
  },
  avatarClosed: {
    background: theme.palette.error.main,
  },
  closed: {
    background: theme.palette.error.light,
  },
}));
