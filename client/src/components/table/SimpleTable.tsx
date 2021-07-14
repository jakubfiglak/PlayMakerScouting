import { FC } from 'react';
// MUI components
import {
  Table as MUITable,
  TableBody,
  TableContainer,
  Paper,
  TableHead,
} from '@material-ui/core';
// Styles
import { useStyles } from './styles';
import { StyledTableCell } from './TableCell';
import { StyledTableRow } from './TableRow';

type Props = {
  headCells: { id: string; label: string }[];
  actions?: boolean;
};

export const SimpleTable: FC<Props> = ({ children, headCells, actions }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <MUITable className={classes.table}>
        <TableHead>
          <StyledTableRow>
            {actions && <StyledTableCell />}
            {headCells.map((headCell) => (
              <StyledTableCell key={headCell.id}>
                {headCell.label}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MUITable>
    </TableContainer>
  );
};
