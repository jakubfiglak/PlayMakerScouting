import React from 'react';
// MUI components
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableRow,
} from '@material-ui/core';
// Custom components
import { TablePaginationActions, TableHeader } from '../../common';
import { ClubsTableRow } from './ClubsTableRow';
// Types
import { Club } from '../../../types/clubs';
import { CommonTableProps } from '../../../types/common';
// Utils & data
import { clubsHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  clubs: Club[];
  handleSetCurrent: (club: Club) => void;
} & CommonTableProps;

export const ClubsTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  clubs,
  total,
  handleSetCurrent,
}: TableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="clubs table">
        <TableHeader
          headCells={clubsHeadCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {clubs.map((club) => {
            const { _id } = club;

            return (
              <ClubsTableRow
                key={_id}
                club={club}
                handleSetCurrent={handleSetCurrent}
              />
            );
          })}
        </TableBody>
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
      </Table>
    </TableContainer>
  );
};
