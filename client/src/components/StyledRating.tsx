import { createStyles, Theme, withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    '& .MuiRating-iconFilled': {
      color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
      color: theme.palette.primary.light,
    },
  }),
)(Rating);
