import React from 'react';
// Custom components
import { Table } from '../../components/table/Table';
import { ClubsTableRow } from './ClubsTableRow';
// Types
import { Club } from '../../types/clubs';
import { CommonTableProps } from '../../types/common';

type Props = {
  clubs: Club[];
  handleSetCurrent: (club: Club) => void;
} & CommonTableProps;

const headCells = [
  { id: 'name', label: 'Nazwa' },
  { id: 'division', label: 'Poziom rozgrywkowy' },
  { id: 'voivodeship', label: 'Województwo' },
];

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
}: Props) => {
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
      {clubs.map((club) => {
        const { id: _id } = club;

        return (
          <ClubsTableRow
            key={_id}
            club={club}
            handleSetCurrent={handleSetCurrent}
          />
        );
      })}
    </Table>
  );
};
