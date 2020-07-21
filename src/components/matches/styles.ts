import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  delete: {
    color: theme.palette.error.light,
  },
}));

export default useStyles;
