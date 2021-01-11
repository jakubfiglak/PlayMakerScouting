import { withStyles, createStyles, TableRow } from '@material-ui/core';
import { lightGray } from '../../theme/colors';

export const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: lightGray,
      },
    },
  }),
)(TableRow);
