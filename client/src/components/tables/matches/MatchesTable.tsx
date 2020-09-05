import React, { useEffect } from 'react';
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
import {
  Match,
  MatchesData,
  GetMatches,
  MatchesFilterData,
} from '../../../types/matches';
// Hooks
import { useTable } from '../../../hooks';
// Utils & data
import { matchesHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  getMatches: GetMatches;
  matchesData: MatchesData;
  filters: MatchesFilterData;
  deleteMatch: (id: string) => void;
  handleSetCurrent: (match: Match) => void;
};

export const MatchesTable = ({
  getMatches,
  matchesData,
  filters,
  deleteMatch,
  handleSetCurrent,
}: TableProps) => {
  const classes = useStyles();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable('date', 'desc');

  useEffect(() => {
    getMatches(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

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
          {matchesData.data.map((match) => {
            const { _id } = match;

            return (
              <MatchesTableRow
                key={_id}
                match={match}
                deleteMatch={deleteMatch}
                handleSetCurrent={handleSetCurrent}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={4}
              count={matchesData.total}
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
