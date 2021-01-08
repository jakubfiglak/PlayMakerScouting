import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
  },
  submit: {
    position: 'relative',
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
  },
  header: {
    textAlign: 'center',
    padding: 0,
  },
}));
