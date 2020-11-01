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
import { PlayersTableRow } from './PlayersTableRow';
// Types
import { Player } from '../../../types/players';
import { CommonTableProps } from '../../../types/common';
// Utils & data
import { playersHeadCells } from '../data';
// Styles
import { useStyles } from '../styles';

type TableProps = {
  players: Player[];
  handleSetCurrent: (player: Player) => void;
} & CommonTableProps;

export const PlayersTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  players,
  total,
  handleSetCurrent,
}: TableProps) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="players table">
          <TableHeader
            headCells={playersHeadCells}
            sortBy={sortBy}
            order={order}
            handleSort={handleSort}
            actions
          />
          <TableBody>
            {players.map((player) => {
              const { _id } = player;

              return (
                <PlayersTableRow
                  key={_id}
                  player={player}
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
    </>
  );
};
