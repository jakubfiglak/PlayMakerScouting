import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '50%',

      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
);

export default useStyles;
