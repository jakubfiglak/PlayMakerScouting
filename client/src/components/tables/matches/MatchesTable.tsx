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
import { MatchesTableRow } from './MatchesTableRow';
// Types
import { Match } from '../../../types/matches';
import { CommonTableProps } from '../../../types/common';
// Utils & data
import { matchesHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  matches: Match[];
} & CommonTableProps;

export const MatchesTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  matches,
  total,
}: TableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHeader
          headCells={matchesHeadCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {matches.map((match) => {
            const { _id } = match;

            return <MatchesTableRow key={_id} match={match} />;
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={4}
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
