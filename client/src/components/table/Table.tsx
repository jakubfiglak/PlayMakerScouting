import React, { FC } from 'react';
// MUI components
import {
  Table as MUITable,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableRow,
} from '@material-ui/core';
// Custom components
import { TablePaginationActions } from './TablePaginationActions';
import { TableHeader } from './TableHeader';
// Types
import { CommonTableProps } from '../../types/common';
// Styles
import { useStyles } from './styles';

type Props = CommonTableProps & {
  headCells: { id: string; label: string; sortingDisabled?: boolean }[];
};

export const Table: FC<Props> = ({
  children,
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  headCells,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <MUITable className={classes.table}>
        <TableHeader
          headCells={headCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
          actions
        />
        <TableBody>{children}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={8}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MUITable>
    </TableContainer>
  );
};
