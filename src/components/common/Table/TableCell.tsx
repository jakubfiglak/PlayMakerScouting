import { withStyles, createStyles, Theme, TableCell } from '@material-ui/core';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export default StyledTableCell;
