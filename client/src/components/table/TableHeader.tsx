import { TableHead, TableSortLabel } from '@material-ui/core';
// Custom components
import { StyledTableRow } from './TableRow';
import { StyledTableCell } from './TableCell';
// Types
import { SortingOrder } from '../../types/common';

type Props = {
  headCells: { id: string; label: string; sortingDisabled?: boolean }[];
  sortBy: string;
  order: SortingOrder;
  handleSort: (id: string) => void;
  actions?: boolean;
};

export const TableHeader = ({
  headCells,
  sortBy,
  order,
  handleSort,
  actions,
}: Props) => {
  return (
    <TableHead>
      <StyledTableRow>
        {actions && <StyledTableCell />}
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id}>
            <TableSortLabel
              disabled={headCell.sortingDisabled}
              active={sortBy === headCell.id}
              direction={sortBy === headCell.id ? order : 'asc'}
              onClick={() => handleSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};
