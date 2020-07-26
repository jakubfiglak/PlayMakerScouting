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
import { PlayersTableRow } from './PlayersTableRow';
// Types
import {
  PlayersData,
  GetPlayers,
  PlayersFilterData,
  Player,
} from '../../../types/players';
// Hooks
import { useTable } from '../../../hooks';
// Utils & data
import { playersHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  getPlayers: GetPlayers;
  playersData: PlayersData;
  filters: PlayersFilterData;
  deletePlayer: (id: string) => void;
  handleSetCurrent: (player: Player) => void;
};

export const PlayersTable = ({
  getPlayers,
  playersData,
  filters,
  deletePlayer,
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
  ] = useTable();

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHeader
          headCells={playersHeadCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {playersData.data.map((player) => {
            const { _id } = player;

            return (
              <PlayersTableRow
                key={_id}
                player={player}
                deletePlayer={deletePlayer}
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
              count={playersData.total}
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
