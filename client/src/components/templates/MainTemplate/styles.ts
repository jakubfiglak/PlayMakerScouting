import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      maxWidth: '100%',

      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(3)}px 0`,
      },
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export default useStyles;
