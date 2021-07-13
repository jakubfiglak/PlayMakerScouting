import { withStyles, createStyles, TableRow, Theme } from '@material-ui/core';

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    hover: {
      '&:hover': {
        cursor: 'pointer',
        boxShadow: theme.shadows[4],
      },
    },
  }),
)(TableRow);
