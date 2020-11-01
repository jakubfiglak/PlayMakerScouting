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
// Hooks
import { useAuthState } from '../../../context';
// Utils & data
import { clubsHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  clubs: Club[];
  handleSetCurrent: (club: Club) => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
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
  addToFavorites,
  removeFromFavorites,
}: TableProps) => {
  const classes = useStyles();
  const { user } = useAuthState();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="clubs table">
        <TableHeader
          headCells={clubsHeadCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
          actions
        />
        <TableBody>
          {clubs.map((club) => {
            const { _id } = club;

            return (
              <ClubsTableRow
                key={_id}
                club={club}
                isFavorite={user?.myClubs.includes(_id) || false}
                handleSetCurrent={handleSetCurrent}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
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
