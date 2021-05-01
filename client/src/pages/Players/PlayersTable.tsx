import React from 'react';
// Custom components
import { PlayersTableRow } from './PlayersTableRow';
import { Table } from '../../components/table/Table';
// Types
import { Player } from '../../types/players';
import { CommonTableProps } from '../../types/common';

type TableProps = {
  players: Player[];
  handleSetCurrent: (player: Player) => void;
} & CommonTableProps;

const headCells = [
  { id: 'lastName', label: 'Nazwisko' },
  { id: 'firstName', label: 'Imię' },
  { id: 'club', label: 'Klub' },
  { id: 'position', label: 'Pozycja' },
  { id: 'yearOfBirth', label: 'Rok urodzenia' },
  { id: 'footed', label: 'Noga' },
];

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
  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={headCells}
    >
      {players.map((player) => {
        const { id } = player;

        return (
          <PlayersTableRow
            key={id}
            player={player}
            handleSetCurrent={handleSetCurrent}
          />
        );
      })}
    </Table>
  );
};
