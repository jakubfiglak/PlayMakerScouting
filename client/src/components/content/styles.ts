import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    paginationContainer: {
      '& > *': {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
      },
    },
  }),
);
