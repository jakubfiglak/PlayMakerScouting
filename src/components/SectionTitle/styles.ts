import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    marginBottom: '20px',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));

export default useStyles;
