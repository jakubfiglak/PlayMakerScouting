import { withStyles, createStyles, Theme, TableCell } from '@material-ui/core';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 14,
      color: 'inherit',
    },
  }),
)(TableCell);
