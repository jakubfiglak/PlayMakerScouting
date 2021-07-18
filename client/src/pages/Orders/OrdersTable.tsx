import { FC } from 'react';
// Custom components
import { Table } from '../../components/table/Table';
// Types
import { CommonTableProps } from '../../types/common';

type Props = CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'player.position', label: 'Pozycja', sortingDisabled: true },
  { id: 'player.club', label: 'Klub', sortingDisabled: true },
  { id: 'status', label: 'Status' },
  { id: 'scout', label: 'Scout' },
  { id: 'createdAt', label: 'Data utworzenia' },
  { id: 'notes', label: 'Uwagi' },
];

export const OrdersTable: FC<Props> = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  children,
}) => {
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
      actions
    >
      {children}
    </Table>
  );
};
