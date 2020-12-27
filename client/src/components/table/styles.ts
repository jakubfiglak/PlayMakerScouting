import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    table: {
      minWidth: 700,
    },
    paper: {
      overflowX: 'auto',
      margin: '0 auto',
    },
    formControl: {
      minWidth: 120,
      margin: '20px',
    },
    delete: {
      color: theme.palette.error.light,
    },
  }),
);
