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
  formControl: {
    minWidth: 120,
    margin: '20px',
  },
});

export default useStyles;
