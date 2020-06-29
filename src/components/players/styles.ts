import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paper: {
    maxWidth: '90vw',
    overflowX: 'auto',
    margin: '0 auto',
  },
  body: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
});

export default useStyles;
