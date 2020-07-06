import React from 'react';
import { TableHead, TableSortLabel } from '@material-ui/core';
import StyledTableRow from './TableRow';
import StyledTableCell from './TableCell';
import { TableHeaderProps } from './types';

const TableHeader = ({
  headCells,
  sortBy,
  order,
  handleSort,
}: TableHeaderProps) => {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id}>
            <TableSortLabel
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

export default TableHeader;
