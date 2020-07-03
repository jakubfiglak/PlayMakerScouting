import React from 'react';
import { TableHead, TableSortLabel } from '@material-ui/core';
import TableRow from '../TableRow/TableRow';
import TableCell from '../TableCell/TableCell';
import { HeadCell } from './types';
import { Order } from '../../../types/common';

const TableHeader: React.FC<{
  headCells: HeadCell[];
  sortBy: string;
  order: Order;
  handleSort: (id: string) => void;
}> = ({ headCells, sortBy, order, handleSort }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel
              active={sortBy === headCell.id}
              direction={sortBy === headCell.id ? order : 'asc'}
              onClick={() => handleSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
