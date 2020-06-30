import React from 'react';
import { TableHead, TableSortLabel } from '@material-ui/core';
import TableRow from '../TableRow/TableRow';
import TableCell from '../TableCell/TableCell';
import HeadCell from './types';

const TableHeader: React.FC<{
  headCells: HeadCell[];
  sort: string;
  setSort: (id: string) => void;
}> = ({ headCells, sort, setSort }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel
              active={headCell.id === sort}
              direction="asc"
              onClick={() => {
                console.log('click!');
                setSort(headCell.id);
              }}
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
